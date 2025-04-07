
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, question, transcription, jobDetails } = await req.json();
    
    // If transcription is already provided, use it directly
    let userResponse = transcription;
    
    // If audio is provided but no transcription, transcribe it
    if (audio && !transcription) {
      userResponse = await transcribeAudio(audio);
    }
    
    if (!userResponse || !question) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: transcription/audio or question" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze the response based on the question and job details
    const analysis = await analyzeResponse(question, userResponse, jobDetails);
    
    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in analyze-job-specific-interview function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function transcribeAudio(base64Audio) {
  try {
    // Convert base64 to binary
    const binaryAudio = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
    
    // Create file blob
    const blob = new Blob([binaryAudio], { type: 'audio/webm' });
    
    // Prepare form data for OpenAI API
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');
    formData.append('model', 'whisper-1');
    
    // Call OpenAI's Whisper API
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI Whisper API error: ${errorText}`);
    }
    
    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}

async function analyzeResponse(question, response, jobDetails) {
  try {
    // Define the system prompt for job-specific analysis
    const systemPrompt = `You are an expert interview coach providing feedback on job-specific interview responses.
Analyze the following response to the given job interview question. 

Consider these job details:
- Job Title: ${jobDetails.jobTitle}
- Company: ${jobDetails.companyName}
- Position Level: ${jobDetails.positionLevel}
- Key Skills Required: ${jobDetails.keySkills}
- Job Description Summary: ${jobDetails.jobDescription.substring(0, 250)}...

Provide detailed feedback on:

1. Relevance: How well did the response address the specific job requirements and skills?
2. Confidence: How confidently did the candidate express themselves?
3. Clarity: How clear and concise was the response?
4. Job Fit: How well did the candidate demonstrate they are a good fit for this role?

For each category, provide:
- A score between 0-100
- Specific strengths in the response
- Concrete suggestions for improvement
- What was missing from the answer (if anything)

Provide an overall score and summary feedback that helps the candidate improve specifically for this job position. Your analysis should be constructive and actionable.`;

    // Call OpenAI's API
    const response2 = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Question: ${question}\n\nCandidate's Response: ${response}` }
        ],
        temperature: 0.7,
      }),
    });
    
    if (!response2.ok) {
      const errorText = await response2.text();
      throw new Error(`OpenAI Analysis API error: ${errorText}`);
    }
    
    const result = await response2.json();
    const analysisText = result.choices[0].message.content;
    
    // Parse the analysis text to extract scores
    const relevanceMatch = analysisText.match(/Relevance:.*?(\d+)/s);
    const confidenceMatch = analysisText.match(/Confidence:.*?(\d+)/s);
    const clarityMatch = analysisText.match(/Clarity:.*?(\d+)/s);
    const jobFitMatch = analysisText.match(/Job Fit:.*?(\d+)/s);
    const overallMatch = analysisText.match(/[Oo]verall [Ss]core:.*?(\d+)/s);
    
    // Extract scores or use defaults
    const relevance = relevanceMatch ? parseInt(relevanceMatch[1]) : 70;
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 70;
    const clarity = clarityMatch ? parseInt(clarityMatch[1]) : 70;
    const jobFit = jobFitMatch ? parseInt(jobFitMatch[1]) : 70;
    const overall = overallMatch ? parseInt(overallMatch[1]) : 70;
    
    // Return structured analysis result
    return {
      sentiment: {
        relevance,
        confidence,
        clarity,
        jobFit,
        overall
      },
      feedback: analysisText,
      transcription: response
    };
  } catch (error) {
    console.error("Analysis error:", error);
    throw new Error(`Failed to analyze response: ${error.message}`);
  }
}
