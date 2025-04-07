
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Default response to ensure consistent structure
const defaultResponse = {
  sentiment: {
    confidence: 50,
    clarity: 50,
    relevance: 50,
    jobFit: 50,
    overall: 50
  },
  feedback: "Unable to analyze response. Please try again."
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { question, transcription, jobDetails } = requestBody;
    
    if (!question || !transcription || !jobDetails) {
      console.error("Missing required parameters:", { 
        hasQuestion: !!question, 
        hasTranscription: !!transcription, 
        hasJobDetails: !!jobDetails 
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Missing required parameters",
          ...defaultResponse
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate job details with fallbacks
    const safeJobDetails = {
      jobTitle: jobDetails.jobTitle || 'Unknown position',
      companyName: jobDetails.companyName || 'Unknown company',
      jobDescription: jobDetails.jobDescription || '',
      positionLevel: jobDetails.positionLevel || 'Entry level',
      keySkills: jobDetails.keySkills || ''
    };
    
    // Get job-specific analysis
    const analysis = await analyzeJobSpecificResponse(question, transcription, safeJobDetails);
    
    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in job-specific interview analysis:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        ...defaultResponse
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function analyzeJobSpecificResponse(
  question: string,
  transcription: string,
  jobDetails: {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    positionLevel: string;
    keySkills: string;
  }
) {
  try {
    const { jobTitle, companyName, jobDescription, positionLevel, keySkills } = jobDetails;
    
    const systemPrompt = `You are an expert interview coach analyzing a candidate's response to a job-specific interview question.
    
You will analyze the response based on several factors:
1. Confidence (How confidently was the answer delivered? Consider tone, language, and clarity of expression)
2. Clarity (How clear and well-structured was the answer?)
3. Relevance (How relevant was the answer to the question asked?)
4. Job Fit (How well does the answer demonstrate qualifications for the specific job?)
5. Overall impression (Overall quality of the response)

Provide scores for each factor on a scale of 0-100.

Also provide specific, actionable feedback on:
- Strengths of the response
- Areas for improvement
- How the answer could better demonstrate qualifications for the ${jobTitle} role at ${companyName}
- How well the answer addressed the job requirements and key skills: ${keySkills}
- Whether the answer was appropriate for a ${positionLevel} position

Format your analysis as JSON with the following structure:
{
  "sentiment": {
    "confidence": number,
    "clarity": number,
    "relevance": number,
    "jobFit": number,
    "overall": number
  },
  "feedback": "detailed feedback with strengths, areas for improvement, and job-specific advice"
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Question: ${question}\n\nCandidate's Response: ${transcription}\n\nPlease analyze this response in the context of a ${jobTitle} position at ${companyName}.` }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error (${response.status}):`, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Make sure we have a content field
    if (!data?.choices?.[0]?.message?.content) {
      console.error("Invalid response format from OpenAI:", data);
      throw new Error("Invalid response format from OpenAI");
    }
    
    let parsedContent;
    
    try {
      parsedContent = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", data.choices[0].message.content);
      throw new Error("Failed to parse OpenAI response");
    }
    
    // Ensure the data structure is complete with fallbacks for any missing fields
    const result = {
      sentiment: {
        confidence: parsedContent?.sentiment?.confidence ?? 50,
        clarity: parsedContent?.sentiment?.clarity ?? 50,
        relevance: parsedContent?.sentiment?.relevance ?? 50,
        jobFit: parsedContent?.sentiment?.jobFit ?? 50,
        overall: parsedContent?.sentiment?.overall ?? 50
      },
      feedback: parsedContent?.feedback || "No feedback provided."
    };
    
    return result;
  } catch (error) {
    console.error("Job-specific analysis error:", error);
    // Return a fallback structure instead of throwing
    return {
      sentiment: {
        confidence: 50,
        clarity: 50,
        relevance: 50,
        jobFit: 50,
        overall: 50
      },
      feedback: `There was an error analyzing your response: ${error.message}. Please try again.`
    };
  }
}
