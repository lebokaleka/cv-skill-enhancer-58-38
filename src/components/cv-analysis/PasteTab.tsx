
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface PasteTabProps {
  value: string;
  onChange: (value: string) => void;
}

const PasteTab = ({ value, onChange }: PasteTabProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your CV content here..."
        className="min-h-[400px] resize-none border-2 border-gray-300 p-4 focus:border-[#46235C] focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default PasteTab;
