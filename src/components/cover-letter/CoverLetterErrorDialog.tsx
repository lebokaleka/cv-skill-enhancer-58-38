
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        variant="notification" 
        className="fixed bottom-4 right-4 top-auto left-auto transform-none bg-white dark:bg-gray-900 rounded-lg p-4 max-w-md shadow-md border border-gray-100 dark:border-gray-800"
      >
        <DialogTitle className="text-base font-medium text-foreground">Missing information</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">{errorMessage}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterErrorDialog;
