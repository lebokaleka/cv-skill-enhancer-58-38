
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface CoverLetterErrorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  errorMessage: string | null;
}

const CoverLetterErrorDialog = ({ open, setOpen, errorMessage }: CoverLetterErrorDialogProps) => {
  // Auto-hide notification after 3 seconds
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [open, setOpen]);

  if (!errorMessage) return null;
  
  // Determine if this is a critical error (both missing) or just a warning
  const isCriticalError = errorMessage.includes("and");
  
  // Choose the appropriate icon based on severity
  const Icon = isCriticalError ? AlertCircle : AlertTriangle;
  const iconColor = isCriticalError ? "text-red-500" : "text-amber-500";
  const titleText = isCriticalError ? "Missing information" : "Missing input";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        variant="notification" 
        className="fixed bottom-4 right-4 top-auto left-auto transform-none bg-white dark:bg-gray-900 rounded-lg p-4 max-w-md shadow-md border border-gray-100 dark:border-gray-800"
      >
        <DialogTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span>{titleText}</span>
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground pl-7">
          {errorMessage}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterErrorDialog;
