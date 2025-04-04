
import { serve } from "https://deno.land/std@0.180.0/http/server.ts";

// Define the type for the request body
interface RequestBody {
  audio?: string; // Base64 encoded audio
  transcription?: string; // Text transcription (if already available)
  question: string; // The interview question being asked
}

// Define the response structure
interface AnalysisResponse {
  transcription?: string;
  sentiment: {
    confidence: number;
    clarity: number;
    relevance: number;
    overall: number;
  };
  feedback: string;
}

serve(async (req) => {
  try {
    // CORS headers
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, { headers, status: 204 });
    }

    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { headers, status: 405 }
      );
    }

    // Get the request body
    const body: RequestBody = await req.json();
    console.log("Received request with question:", body.question);
    console.log("Audio data present:", !!body.audio);

    // Ensure we have a question
    if (!body.question) {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { headers, status: 400 }
      );
    }

    // Ensure we have either audio or transcription
    if (!body.audio && !body.transcription) {
      return new Response(
        JSON.stringify({ error: "Either audio or transcription is required" }),
        { headers, status: 400 }
      );
    }

    // Get environment variables
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { headers, status: 500 }
      );
    }

    let transcription = body.transcription;

    // If audio is provided but no transcription, transcribe using Whisper API
    if (body.audio && !transcription) {
      console.log("Transcribing audio with Whisper API");
      try {
        const audioData = body.audio.split(",")[1]; // Remove data URL prefix if present
        const audioBlob = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
        
        const formData = new FormData();
        formData.append("file", new Blob([audioBlob], { type: "audio/webm" }), "audio.webm");
        formData.append("model", "whisper-1");
        
        const whisperResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
          body: formData,
        });
        
        if (!whisperResponse.ok) {
          const errorText = await whisperResponse.text();
          console.error("Whisper API error:", errorText);
          return new Response(
            JSON.stringify({ error: `Transcription failed: ${errorText}` }),
            { headers, status: whisperResponse.status }
          );
        }
        
        const whisperData = await whisperResponse.json();
        transcription = whisperData.text;
        console.log("Transcription successful:", transcription);
      } catch (error) {
        console.error("Transcription error:", error.message);
        return new Response(
          JSON.stringify({ error: `Transcription error: ${error.message}` }),
          { headers, status: 500 }
        );
      }
    }

    if (!transcription || transcription.trim() === "") {
      return new Response(
        JSON.stringify({ error: "Failed to obtain valid transcription" }),
        { headers, status: 400 }
      );
    }

    // Now analyze the response using gpt-4o-mini
    console.log("Analyzing response with GPT-4o-mini");
    const prompt = `
You are an expert interview coach analyzing a candidate's response to an interview question.

Question: "${body.question}"

Candidate's Response: "${transcription}"

Analyze the response and provide:
1. A score for confidence (0-100)
2. A score for clarity (0-100)
3. A score for relevance to the question (0-100)
4. An overall score (0-100)
5. Constructive feedback on how to improve the response

Your feedback should be specific, actionable, and helpful. Mention what was missing in the answer and how the candidate can improve. Be encouraging but honest.

Format your response as JSON with the following structure:
{
  "sentiment": {
    "confidence": number,
    "clarity": number,
    "relevance": number,
    "overall": number
  },
  "feedback": "Your detailed feedback here"
}
`;

    const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!gptResponse.ok) {
      const errorText = await gptResponse.text();
      console.error("GPT API error:", errorText);
      return new Response(
        JSON.stringify({ error: `Analysis failed: ${errorText}` }),
        { headers, status: gptResponse.status }
      );
    }

    const gptData = await gptResponse.json();
    const analysisContent = gptData.choices[0].message.content;
    console.log("GPT analysis response:", analysisContent);
    
    // Parse the JSON response from GPT
    let analysisResult;
    try {
      analysisResult = JSON.parse(analysisContent);
    } catch (error) {
      console.warn("Failed to parse GPT response as JSON, using regex fallback");
      
      // If parsing fails, extract scores manually using regex
      const confidence = analysisContent.match(/confidence"?\s*:\s*(\d+)/i)?.[1] || 70;
      const clarity = analysisContent.match(/clarity"?\s*:\s*(\d+)/i)?.[1] || 70;
      const relevance = analysisContent.match(/relevance"?\s*:\s*(\d+)/i)?.[1] || 70;
      const overall = analysisContent.match(/overall"?\s*:\s*(\d+)/i)?.[1] || 70;
      const feedback = analysisContent.match(/feedback"?\s*:\s*"([^"]*)"/i)?.[1] || 
                      "Please improve your answer by providing more specific examples and structuring your response more clearly.";
      
      analysisResult = {
        sentiment: {
          confidence: parseInt(confidence),
          clarity: parseInt(clarity),
          relevance: parseInt(relevance),
          overall: parseInt(overall)
        },
        feedback
      };
    }

    // Combine the transcription and analysis
    const result: AnalysisResponse = {
      transcription,
      sentiment: analysisResult.sentiment,
      feedback: analysisResult.feedback
    };

    console.log("Sending final response");
    return new Response(JSON.stringify(result), { headers, status: 200 });
  } catch (error) {
    console.error("Server error:", error.message, error.stack);
    return new Response(
      JSON.stringify({ error: `Server error: ${error.message}` }),
      { 
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }, 
        status: 500 
      }
    );
  }
});
