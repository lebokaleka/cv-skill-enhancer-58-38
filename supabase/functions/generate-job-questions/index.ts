
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
    const { jobTitle, companyName, jobDescription, positionLevel, keySkills } = await req.json();
    
    if (!jobTitle || !companyName || !jobDescription || !positionLevel || !keySkills) {
      return new Response(
        JSON.stringify({ error: "Missing required job details" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call OpenAI to generate job-specific questions
    const questions = await generateJobQuestions(jobTitle, companyName, jobDescription, positionLevel, keySkills);
    
    return new Response(
      JSON.stringify({ questions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in generate-job-questions function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function generateJobQuestions(
  jobTitle: string, 
  companyName: string, 
  jobDescription: string, 
  positionLevel: string, 
  keySkills: string
) {
  try {
    const systemPrompt = `You are an expert interviewer generating job-specific interview questions.
    
Based on the provided job details, generate 5 targeted interview questions that would be appropriate for an interview for this position.

For each question, provide:
1. The question text
2. The question type (select from: Behavioral, Self-Assessment, Company Knowledge, Motivational, Problem-Solving, Teamwork, Time Management, Communication, Persuasive, Work Ethic, Personality Fit, Career Goals, Project Management, Conflict Resolution, Leadership, Customer Service, Analytical Thinking, Productivity & Efficiency, Decision-Making, Leadership & Change Management, Strategic Thinking, Change Management, Process Improvement, Conflict Resolution & Cross-Functional Leadership, Resilience & Problem-Solving, Strategic Risk Assessment, People Management, Leadership & HR Management, Leadership & Team Building, Mentorship & Leadership, Financial Decision-Making, Business Performance Analysis, Project & Stakeholder Management, Data-Driven Decision-Making, Executive Communication, Negotiation & Business Development, Public Speaking & Brand Representation, Cross-Cultural & Remote Leadership, Adaptability, Leadership Potential, Self-Improvement)
3. A list of 3-5 key points the candidate should address in their answer

Format your response as a clean JSON array of question objects.`;

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
          { role: 'user', content: `Job Title: ${jobTitle}
Company: ${companyName}
Job Description: ${jobDescription}
Position Level: ${positionLevel}
Key Skills: ${keySkills}

Generate 5 interview questions for this position.` }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }
    
    const result = await response.json();
    const content = result.choices[0].message.content;
    
    // Parse the JSON response
    const parsedContent = JSON.parse(content);
    return parsedContent.questions || [];
  } catch (error) {
    console.error("Question generation error:", error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
}
