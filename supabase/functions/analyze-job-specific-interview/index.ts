
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
    const { question, transcription, jobDetails } = await req.json();
    
    if (!question || !transcription || !jobDetails) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get job-specific analysis
    const analysis = await analyzeJobSpecificResponse(question, transcription, jobDetails);
    
    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in job-specific interview analysis:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        // Provide default structure to prevent map errors
        sentiment: {
          confidence: 0,
          clarity: 0,
          relevance: 0,
          jobFit: 0,
          overall: 0
        },
        feedback: "Error analyzing response. Please try again."
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
      throw new Error(`OpenAI API error: ${errorText}`);
    }
    
    const data = await response.json();
    const parsedContent = JSON.parse(data.choices[0].message.content);
    
    // Ensure the data structure is complete to prevent map errors
    const result = {
      sentiment: {
        confidence: parsedContent.sentiment?.confidence || 0,
        clarity: parsedContent.sentiment?.clarity || 0,
        relevance: parsedContent.sentiment?.relevance || 0,
        jobFit: parsedContent.sentiment?.jobFit || 0,
        overall: parsedContent.sentiment?.overall || 0
      },
      feedback: parsedContent.feedback || "No feedback provided."
    };
    
    return result;
  } catch (error) {
    console.error("Job-specific analysis error:", error);
    // Return a fallback structure instead of throwing
    return {
      sentiment: {
        confidence: 0,
        clarity: 0,
        relevance: 0,
        jobFit: 0,
        overall: 0
      },
      feedback: `There was an error analyzing your response: ${error.message}. Please try again.`
    };
  }
}
