
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";
import { getScoreColor } from './MatchScoreDisplay';

interface SectionBreakdownChartProps {
  sectionScores: MatchResult['sectionScores'];
}

export const getBarColor = (score: number) => {
  if (score >= 80) return "#22c55e"; // green-500
  if (score >= 60) return "#f59e0b"; // amber-500
  return "#ef4444"; // red-500
};

const getSectionData = (sectionScores: MatchResult['sectionScores']) => {
  return [
    { name: 'Skills', value: sectionScores.skills, fill: getBarColor(sectionScores.skills) },
    { name: 'Experience', value: sectionScores.experience, fill: getBarColor(sectionScores.experience) },
    { name: 'Education', value: sectionScores.education, fill: getBarColor(sectionScores.education) },
    { name: 'Certifications', value: sectionScores.certifications, fill: getBarColor(sectionScores.certifications) },
  ];
};

const SectionBreakdownChart = ({ sectionScores }: SectionBreakdownChartProps) => {
  return (
    <div className="pb-6 border-b">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <BarChartIcon size={18} />
        <span>Section-wise Breakdown</span>
      </h3>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getSectionData(sectionScores)}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectionBreakdownChart;
