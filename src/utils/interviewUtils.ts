import { Message, QuestionWithStrategy } from '@/types/interview';
import { toast } from "@/hooks/use-toast";

export const interviewQuestionsByCategory = {
  general: {
    basic: [
      {
        question: "Tell me about yourself and your background.",
        type: "Behavioral",
        keyPoints: [
          "Relevant education and experience",
          "Key skills",
          "Career goals"
        ]
      },
      {
        question: "What do you know about our company?",
        type: "Company Knowledge",
        keyPoints: [
          "Mission, values, and services",
          "Why you want to work here",
          "Recent company news"
        ]
      },
      {
        question: "Why do you want this job?",
        type: "Motivational",
        keyPoints: [
          "Passion for the role",
          "Career growth alignment",
          "How you can contribute"
        ]
      },
      {
        question: "What are your strengths?",
        type: "Self-Assessment",
        keyPoints: [
          "Top skills",
          "Example of using strengths",
          "Job relevance"
        ]
      },
      {
        question: "What are your weaknesses?",
        type: "Self-Assessment",
        keyPoints: [
          "Honest weakness",
          "How you are improving it",
          "Example of growth"
        ]
      },
      {
        question: "How do you handle stress or pressure?",
        type: "Behavioral",
        keyPoints: [
          "Coping techniques",
          "Example of stress management",
          "Outcome"
        ]
      },
      {
        question: "Describe a time you worked in a team.",
        type: "Behavioral",
        keyPoints: [
          "Your role",
          "Challenges faced",
          "Team success"
        ]
      },
      {
        question: "Tell me about a time you faced a challenge at work.",
        type: "Behavioral",
        keyPoints: [
          "The challenge",
          "Steps taken",
          "Final result"
        ]
      },
      {
        question: "What motivates you?",
        type: "Motivational",
        keyPoints: [
          "Key personal motivators",
          "A real-life example",
          "Impact on performance"
        ]
      },
      {
        question: "How do you prioritize tasks?",
        type: "Behavioral",
        keyPoints: [
          "Time management methods",
          "Task organization strategy",
          "Meeting deadlines"
        ]
      },
      {
        question: "Give an example of a time you went above and beyond.",
        type: "Behavioral",
        keyPoints: [
          "Situation requiring extra effort",
          "Actions you took",
          "Impact"
        ]
      },
      {
        question: "How do you handle feedback from a supervisor?",
        type: "Behavioral",
        keyPoints: [
          "Receiving and applying feedback",
          "Past example",
          "Positive changes"
        ]
      },
      {
        question: "What do you do when you don't know how to complete a task?",
        type: "Problem-Solving",
        keyPoints: [
          "Research and learning approach",
          "Asking for help vs. independence",
          "Example of overcoming uncertainty"
        ]
      },
      {
        question: "Tell me about a time you helped a colleague.",
        type: "Teamwork",
        keyPoints: [
          "Colleague's problem",
          "How you assisted",
          "Results"
        ]
      },
      {
        question: "What would you do if you had multiple deadlines at the same time?",
        type: "Time Management",
        keyPoints: [
          "Prioritization techniques",
          "Managing workload",
          "Example"
        ]
      },
      {
        question: "Describe a time you had to explain something complex to someone.",
        type: "Communication",
        keyPoints: [
          "Topic explained",
          "Strategy used",
          "How the person understood it"
        ]
      },
      {
        question: "Why should we hire you?",
        type: "Persuasive",
        keyPoints: [
          "Unique value proposition",
          "Job-relevant skills",
          "Cultural fit"
        ]
      },
      {
        question: "How do you ensure quality in your work?",
        type: "Work Ethic",
        keyPoints: [
          "Attention to detail",
          "Checking and reviewing work",
          "Example of quality improvement"
        ]
      },
      {
        question: "What do you enjoy doing outside of work?",
        type: "Personality Fit",
        keyPoints: [
          "Interests and hobbies",
          "How they contribute to personal growth",
          "Cultural fit"
        ]
      },
      {
        question: "Where do you see yourself in 5 years?",
        type: "Career Goals",
        keyPoints: [
          "Future aspirations",
          "Alignment with the company",
          "Steps toward the goal"
        ]
      }
    ],
    intermediate: [
      {
        question: "Describe a time when you had to persuade someone.",
        type: "Behavioral",
        keyPoints: [
          "Situation requiring persuasion",
          "Strategy used (logic, data, emotional appeal)",
          "Resistance faced and how you overcame it",
          "Outcome of your persuasion"
        ]
      },
      {
        question: "Tell me about a project you successfully managed.",
        type: "Project Management",
        keyPoints: [
          "Project goal and scope",
          "Planning and execution strategies",
          "Challenges encountered and solutions applied",
          "Measurable results"
        ]
      },
      {
        question: "Describe a time you received constructive criticism.",
        type: "Behavioral",
        keyPoints: [
          "Who provided the feedback and why",
          "How you responded emotionally and professionally",
          "Actions taken to improve",
          "Positive outcome from applying the feedback"
        ]
      },
      {
        question: "Have you ever disagreed with a coworker? How did you handle it?",
        type: "Conflict Resolution",
        keyPoints: [
          "Nature of the disagreement",
          "Communication strategies used",
          "Compromise or resolution found",
          "Outcome and lessons learned"
        ]
      },
      {
        question: "How do you handle tight deadlines?",
        type: "Time Management",
        keyPoints: [
          "Prioritization techniques",
          "Stress management strategies",
          "Example of successfully meeting a deadline",
          "Balancing quality with speed"
        ]
      },
      {
        question: "What steps do you take to improve your skills?",
        type: "Self-Improvement",
        keyPoints: [
          "Areas identified for improvement",
          "Resources and learning strategies",
          "How you've applied new skills",
          "Continuous growth mindset"
        ]
      },
      {
        question: "Tell me about a time you had to learn something quickly.",
        type: "Adaptability",
        keyPoints: [
          "Why quick learning was required",
          "How you approached learning (research, training, mentorship)",
          "Challenges faced",
          "How you successfully applied new knowledge"
        ]
      },
      {
        question: "Describe a situation where you took the initiative.",
        type: "Leadership Potential",
        keyPoints: [
          "Why initiative was needed",
          "Actions taken without being asked",
          "Impact of your efforts",
          "Recognition or lessons learned"
        ]
      },
      {
        question: "How do you handle a difficult customer or client?",
        type: "Customer Service",
        keyPoints: [
          "Nature of the issue",
          "Communication techniques used",
          "Conflict resolution strategies",
          "Result and customer satisfaction"
        ]
      },
      {
        question: "Tell me about a time you had to multitask.",
        type: "Time Management",
        keyPoints: [
          "Number of tasks and competing priorities",
          "How you organized workload",
          "Challenges encountered",
          "Final outcome and effectiveness"
        ]
      },
      {
        question: "What would you do if you had to manage a team conflict?",
        type: "Leadership & Conflict Resolution",
        keyPoints: [
          "Nature of the conflict",
          "Mediation strategies used",
          "Steps to reach a resolution",
          "Impact on team dynamics"
        ]
      },
      {
        question: "Give an example of a time you improved a process.",
        type: "Problem-Solving",
        keyPoints: [
          "Process inefficiency identified",
          "How you analyzed and proposed a solution",
          "Implementation of the change",
          "Measurable improvements"
        ]
      },
      {
        question: "Describe a time you solved a complex problem.",
        type: "Analytical Thinking",
        keyPoints: [
          "The problem and why it was complex",
          "Steps taken to analyze and break it down",
          "Solution and implementation",
          "Lessons learned"
        ]
      },
      {
        question: "How do you stay organized in a fast-paced environment?",
        type: "Time Management",
        keyPoints: [
          "Organization tools or techniques used",
          "Prioritization of tasks",
          "Example of maintaining efficiency under pressure",
          "Resulting productivity"
        ]
      },
      {
        question: "Tell me about a time you led a small team.",
        type: "Leadership",
        keyPoints: [
          "Team structure and responsibilities",
          "Leadership style used",
          "Challenges faced and solutions implemented",
          "Results achieved"
        ]
      },
      {
        question: "Describe a time when you had to make a difficult decision.",
        type: "Decision-Making",
        keyPoints: [
          "Nature of the decision and factors considered",
          "Weighing risks and benefits",
          "Actions taken",
          "Outcome and reflections"
        ]
      },
      {
        question: "How do you measure success in your work?",
        type: "Work Ethic",
        keyPoints: [
          "Personal success metrics",
          "Examples of achieving success",
          "How you align success with company goals",
          "Continuous improvement strategies"
        ]
      },
      {
        question: "Tell me about a time when you had to deal with an uncooperative team member.",
        type: "Conflict Resolution",
        keyPoints: [
          "Nature of the uncooperative behavior",
          "How you approached the situation",
          "Steps taken to encourage collaboration",
          "Final outcome"
        ]
      },
      {
        question: "What strategies do you use to stay productive?",
        type: "Productivity & Efficiency",
        keyPoints: [
          "Time management techniques",
          "Avoiding distractions",
          "Balancing workload and avoiding burnout",
          "Example of increasing productivity"
        ]
      },
      {
        question: "Describe a time when you had to deliver bad news at work.",
        type: "Communication",
        keyPoints: [
          "Nature of the bad news",
          "Approach to delivering it professionally",
          "Handling reactions and offering solutions",
          "Outcome and lessons learned"
        ]
      }
    ],
    advanced: [
      {
        question: "Describe a time when you had to make a high-stakes decision with limited information.",
        type: "Decision-Making",
        keyPoints: [
          "Context and urgency of the decision",
          "How you analyzed available data",
          "Risks considered before acting",
          "Outcome and lessons learned"
        ]
      },
      {
        question: "Tell me about a time you successfully led a company-wide initiative.",
        type: "Leadership & Change Management",
        keyPoints: [
          "Objective and expected impact",
          "How you gained stakeholder buy-in",
          "Challenges encountered and solutions applied",
          "Final results and long-term benefits"
        ]
      },
      {
        question: "How do you align your team's goals with the company's long-term strategy?",
        type: "Strategic Thinking",
        keyPoints: [
          "Understanding of company vision",
          "Methods used to set and communicate goals",
          "Ensuring alignment through processes and KPIs",
          "Tracking success and making adjustments"
        ]
      },
      {
        question: "Describe a situation where you had to navigate a major organizational change.",
        type: "Change Management",
        keyPoints: [
          "Nature of the change and reasoning behind it",
          "Strategies to manage resistance",
          "Communication techniques used",
          "Final outcome and impact"
        ]
      },
      {
        question: "Tell me about a time you identified a major inefficiency in a company process and implemented a solution.",
        type: "Process Improvement",
        keyPoints: [
          "The inefficiency and its impact",
          "Analysis and solution development",
          "Implementation challenges and adjustments",
          "Measurable improvements"
        ]
      },
      {
        question: "How do you handle conflicting priorities between multiple departments?",
        type: "Conflict Resolution & Cross-Functional Leadership",
        keyPoints: [
          "The nature of the conflict",
          "Strategies for facilitating collaboration",
          "Compromise and negotiation tactics",
          "Final resolution and impact"
        ]
      },
      {
        question: "Describe a time you had to recover from a significant failure.",
        type: "Resilience & Problem-Solving",
        keyPoints: [
          "Nature of the failure and contributing factors",
          "Immediate response and mitigation strategies",
          "Long-term lessons learned",
          "How you ensured it wouldn't happen again"
        ]
      },
      {
        question: "How do you balance innovation with risk management?",
        type: "Strategic Risk Assessment",
        keyPoints: [
          "Understanding of innovation benefits and risks",
          "Risk evaluation and mitigation strategies",
          "Decision-making process for calculated risks",
          "Example of successful innovation implementation"
        ]
      },
      {
        question: "Tell me about a time you had to manage a high-performing but difficult team member.",
        type: "People Management",
        keyPoints: [
          "Challenges in managing the individual",
          "Strategies used to motivate and guide them",
          "Conflict resolution approach",
          "Final outcome and lessons learned"
        ]
      },
      {
        question: "Describe a situation where you had to make a tough personnel decision.",
        type: "Leadership & HR Management",
        keyPoints: [
          "Context of the personnel issue",
          "Decision-making process",
          "Impact on team dynamics",
          "How you handled communication and transition"
        ]
      },
      {
        question: "How do you ensure your team stays motivated and engaged?",
        type: "Leadership & Team Building",
        keyPoints: [
          "Strategies for fostering engagement",
          "Approaches to recognizing and rewarding performance",
          "Maintaining open communication",
          "Example of boosting team morale"
        ]
      },
      {
        question: "Tell me about a time you coached or mentored a team member to success.",
        type: "Mentorship & Leadership",
        keyPoints: [
          "Initial challenges faced by the team member",
          "Your mentoring approach and techniques used",
          "Growth and improvements observed",
          "Final results and long-term impact"
        ]
      },
      {
        question: "Describe a time when you had to manage a budget cut while maintaining productivity.",
        type: "Financial Decision-Making",
        keyPoints: [
          "Budget constraints and impact",
          "Cost-cutting strategies without reducing performance",
          "Communication with stakeholders",
          "Final outcome and efficiency improvements"
        ]
      },
      {
        question: "How do you measure the success of a business initiative?",
        type: "Business Performance Analysis",
        keyPoints: [
          "Key performance indicators used",
          "Tools and methods for tracking progress",
          "Example of a successful initiative",
          "Adjustments made based on data"
        ]
      },
      {
        question: "What's the most complex project you've led?",
        type: "Project & Stakeholder Management",
        keyPoints: [
          "Project scope and challenges",
          "Cross-functional collaboration",
          "Problem-solving and execution strategies",
          "Final outcome and business impact"
        ]
      },
      {
        question: "Tell me about a time you leveraged data analytics to drive decision-making.",
        type: "Data-Driven Decision-Making",
        keyPoints: [
          "Type of data used and analysis performed",
          "Business problem addressed",
          "Insights gained and actions taken",
          "Measurable business impact"
        ]
      },
      {
        question: "How do you handle communication with executives and board members?",
        type: "Executive Communication",
        keyPoints: [
          "Strategies for clear and concise communication",
          "Tailoring messaging for executive-level stakeholders",
          "Managing expectations and feedback",
          "Example of presenting to leadership"
        ]
      },
      {
        question: "Tell me about a time you successfully negotiated a high-value deal or partnership.",
        type: "Negotiation & Business Development",
        keyPoints: [
          "Context of the negotiation",
          "Strategies used (leverage, persuasion, data)",
          "Challenges encountered and how they were overcome",
          "Final agreement and impact"
        ]
      },
      {
        question: "Describe a time when you had to represent your company in a public or industry event.",
        type: "Public Speaking & Brand Representation",
        keyPoints: [
          "Event and audience type",
          "Preparation and messaging strategy",
          "Delivery and engagement approach",
          "Business or networking impact"
        ]
      },
      {
        question: "How do you ensure strong collaboration across remote or global teams?",
        type: "Cross-Cultural & Remote Leadership",
        keyPoints: [
          "Tools and methods for effective communication",
          "Strategies for overcoming cultural and time zone barriers",
          "Ensuring inclusivity and engagement",
          "Example of a successful remote collaboration"
        ]
      }
    ]
  }
};

// Function to select random questions for an interview session
export const selectRandomQuestions = (difficultyLevel: string, count: number = 5): QuestionWithStrategy[] => {
  const allQuestions = interviewQuestionsByCategory.general[difficultyLevel as keyof typeof interviewQuestionsByCategory.general];
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to extract just the question text from the QuestionWithStrategy object
export const extractQuestionTexts = (questions: QuestionWithStrategy[]): string[] => {
  return questions.map(q => q.question);
};

export const startRecording = (setIsRecording: (value: boolean) => void, setRecordingTime: (value: number) => void, setAudioUrl: (value: string | null) => void) => {
  setIsRecording(true);
  setRecordingTime(0);
  setAudioUrl(null);
  toast({
    title: "Recording started",
    description: "Speak clearly into your microphone..."
  });
};

export const stopRecording = (setIsRecording: (value: boolean) => void, setAudioUrl: (value: string | null) => void) => {
  setIsRecording(false);
  setAudioUrl('mock-audio-url');
  toast({
    title: "Recording complete",
    description: "You can now listen to your answer or submit it for analysis."
  });
};

export const generateFeedback = (sentiment: Message["sentiment"]) => {
  if (!sentiment) return '';
  
  // Calculate overall percentage
  const overallScore = sentiment.overall;
  
  // Define possible feedback components based on response analysis
  const contentFeedback = [
    "Your answer lacks specific examples. Try to include concrete situations from your experience.",
    "You provided good examples, but could elaborate more on the results achieved.",
    "Consider structuring your answer using the STAR method for more clarity.",
    "Your answer addresses the question well, but could be more concise.",
    "Try to connect your experience more directly to the requirements of the position.",
    "Your introduction was strong, but your conclusion could be more impactful.",
    "Consider quantifying your achievements with specific metrics or percentages.",
    "You covered the main points well, but missed an opportunity to highlight your unique skills.",
    "Focus more on what you learned from challenging situations rather than just describing them.",
    "Try to demonstrate more self-awareness when discussing your weaknesses."
  ];
  
  const deliveryFeedback = [
    "Practice reducing filler words (like 'um', 'uh', 'like') to sound more confident.",
    "Try varying your tone to emphasize key points in your answer.",
    "Consider slowing down your pace slightly for better clarity.",
    "Pausing briefly between main points can help the interviewer absorb your information better.",
    "Work on maintaining a conversational tone rather than sounding rehearsed.",
    "Your enthusiasm comes through well - maintain this energy throughout all answers.",
    "Practice speaking with more confidence, especially when discussing your achievements.",
    "Consider using more professional vocabulary in your responses.",
    "Try to maintain a positive framing even when discussing challenges."
  ];
  
  // Determine feedback based on score ranges
  let strengthPoints: string[] = [];
  let improvementPoints: string[] = [];
  
  // Select feedback points based on simulated content analysis
  // In a real implementation, this would be based on actual content analysis
  
  // For strengths
  if (overallScore > 70) {
    strengthPoints = [
      "You effectively structured your answer with a clear beginning, middle, and end.",
      "You provided relevant examples that illustrated your skills well.",
      "Your answer demonstrated good self-awareness and authenticity."
    ];
  } else if (overallScore > 50) {
    strengthPoints = [
      "You addressed the key points the question was asking for.",
      "You shared some relevant background information that supports your qualifications."
    ];
  } else {
    strengthPoints = [
      "You maintained a professional tone throughout your answer.",
      "You showed willingness to engage with the question."
    ];
  }
  
  // For improvement areas
  // Select 2-3 random improvement points
  const shuffledContentFeedback = [...contentFeedback].sort(() => 0.5 - Math.random());
  const shuffledDeliveryFeedback = [...deliveryFeedback].sort(() => 0.5 - Math.random());
  
  // Lower scores get more improvement points
  const numImprovements = overallScore > 80 ? 1 : overallScore > 60 ? 2 : 3;
  
  // Mix content and delivery feedback
  improvementPoints = [
    ...shuffledContentFeedback.slice(0, Math.ceil(numImprovements/2)),
    ...shuffledDeliveryFeedback.slice(0, Math.floor(numImprovements/2))
  ];
  
  // Add tailored advice based on score
  let tailoredAdvice = "";
  if (overallScore > 80) {
    tailoredAdvice = "Your answer was strong overall. For even more impact, consider practicing responses to unexpected follow-up questions.";
  } else if (overallScore > 60) {
    tailoredAdvice = "With some refinement in the areas mentioned, your answer will be more impactful and memorable to interviewers.";
  } else {
    tailoredAdvice = "Focus on preparing more thoroughly for common interview questions by writing out key points and practicing your delivery aloud.";
  }
  
  // Create the HTML feedback content
  return `
    <h3>Feedback on your answer:</h3>
    <p><strong>Overall Score:</strong> ${overallScore}%</p>
    
    <h4>What you did well:</h4>
    <ul>
      ${strengthPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <h4>Areas for improvement:</h4>
    <ul>
      ${improvementPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
    
    <p><strong>${tailoredAdvice}</strong></p>
    
    <p class="text-sm mt-4">Try using the STAR method in your answers: <strong>S</strong>ituation, <strong>T</strong>ask, <strong>A</strong>ction, <strong>R</strong>esult. This structure helps you deliver clear, compelling stories about your experience.</p>
  `;
};
