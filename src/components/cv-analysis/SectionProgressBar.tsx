
import React from 'react';

interface SectionProgressBarProps {
  icon: React.ReactNode;
  label: string;
  score: number;
}

const SectionProgressBar = ({ icon, label, score }: SectionProgressBarProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 71) return "text-green-500";
    if (score >= 31) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 71) return "bg-green-500";
    if (score >= 31) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{label}</span>
            <span className={`text-sm ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
            <div 
              className={`h-full transition-all ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProgressBar;
