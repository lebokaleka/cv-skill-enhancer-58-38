
import { FileText } from 'lucide-react';
import CVUploader from "@/components/upload/CVUploader";

interface CVSectionProps {
  onUpload: (text: string, name?: string) => void;
}

const CVSection = ({ onUpload }: CVSectionProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <FileText size={16} />
        <span>Your CV</span>
      </h3>
      <CVUploader onUpload={onUpload} />
    </div>
  );
};

export default CVSection;
