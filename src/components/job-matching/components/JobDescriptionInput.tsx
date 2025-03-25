
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Briefcase size={16} />
        <span>Job Description</span>
      </h3>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste job description here..."
        className="min-h-[180px] resize-none"
      />
    </div>
  );
};

export default JobDescriptionInput;
