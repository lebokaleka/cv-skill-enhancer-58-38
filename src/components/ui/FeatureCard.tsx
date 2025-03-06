
import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "group glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
