
import { Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";

interface ExperienceAlignmentProps {
  experienceAlignment: MatchResult['experienceAlignment'];
}

const ExperienceAlignment = ({ experienceAlignment }: ExperienceAlignmentProps) => {
  return (
    <div className="pb-6 border-b">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Briefcase size={16} className="text-blue-500" />
        <span>Experience Alignment</span>
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-xs font-medium">Matching Experience</h4>
          <ul className="space-y-1">
            {experienceAlignment.matchingExperiences.map((exp, index) => (
              <li key={index} className="flex gap-2 items-center text-xs">
                <CheckCircle size={12} className="text-green-500 shrink-0" />
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xs font-medium">Experience Gaps</h4>
          <ul className="space-y-1">
            {experienceAlignment.experienceGaps.map((gap, index) => (
              <li key={index} className="flex gap-2 items-center text-xs">
                <AlertCircle size={12} className="text-amber-500 shrink-0" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceAlignment;
