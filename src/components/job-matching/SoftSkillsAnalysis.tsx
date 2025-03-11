
import { GraduationCap, AlertCircle } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";

interface SoftSkillsAnalysisProps {
  softSkills: MatchResult['softSkills'];
}

const SoftSkillsAnalysis = ({ softSkills }: SoftSkillsAnalysisProps) => {
  return (
    <div className="pb-6 border-b">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <GraduationCap size={16} className="text-teal-500" />
        <span>Soft Skills Analysis</span>
      </h3>
      
      <div className="space-y-2">
        <div>
          <h4 className="text-xs font-medium mb-2">Required Soft Skills</h4>
          <div className="flex flex-wrap gap-2">
            {softSkills.required.map((skill, index) => (
              <span key={index} className="px-2.5 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-xs font-medium mb-2">Missing Soft Skills</h4>
          <ul className="space-y-1">
            {softSkills.missing.map((skill, index) => (
              <li key={index} className="flex gap-2 items-center text-xs">
                <AlertCircle size={12} className="text-amber-500 shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SoftSkillsAnalysis;
