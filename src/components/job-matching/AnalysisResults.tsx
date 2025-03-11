
import { MatchResult } from "@/types/jobMatching";
import MatchScoreDisplay from "./MatchScoreDisplay";
import SectionBreakdownChart from "./SectionBreakdownChart";
import SkillsAnalysis from "./SkillsAnalysis";
import ExperienceAlignment from "./ExperienceAlignment";
import KeywordAnalysis from "./KeywordAnalysis";
import SoftSkillsAnalysis from "./SoftSkillsAnalysis";
import ActionPlan from "./ActionPlan";

interface AnalysisResultsProps {
  matchResult: MatchResult;
}

const AnalysisResults = ({ matchResult }: AnalysisResultsProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <MatchScoreDisplay score={matchResult.score} />
      <SectionBreakdownChart sectionScores={matchResult.sectionScores} />
      <SkillsAnalysis 
        presentSkills={matchResult.presentSkills}
        missingSkills={matchResult.missingSkills}
      />
      <ExperienceAlignment experienceAlignment={matchResult.experienceAlignment} />
      <KeywordAnalysis keywordAnalysis={matchResult.keywordAnalysis} />
      <SoftSkillsAnalysis softSkills={matchResult.softSkills} />
      <ActionPlan actionItems={matchResult.actionableSummary} />
    </div>
  );
};

export default AnalysisResults;
