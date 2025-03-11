
import { Lightbulb, ChevronRight } from 'lucide-react';

interface ActionPlanProps {
  actionItems: string[];
}

const ActionPlan = ({ actionItems }: ActionPlanProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Lightbulb size={16} className="text-amber-500" />
        <span>Action Plan</span>
      </h3>
      <ul className="space-y-2">
        {actionItems.map((action, index) => (
          <li key={index} className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
            <ChevronRight size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs">{action}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionPlan;
