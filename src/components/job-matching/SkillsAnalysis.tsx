
import { CheckCircle, AlertCircle } from 'lucide-react';

interface SkillsAnalysisProps {
  presentSkills: string[];
  missingSkills: string[];
}

const SkillsAnalysis = ({ presentSkills, missingSkills }: SkillsAnalysisProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-6 border-b">
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <CheckCircle size={16} className="text-green-500" />
          <span>Skills You Have</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {presentSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          <span>Missing Skills</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysis;
