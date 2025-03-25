
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
        className="fixed bottom-4 right-4 top-auto left-auto transform-none border-none shadow-lg"
      >
        <DialogTitle className="text-base font-medium">Missing information</DialogTitle>
        <DialogDescription className="text-sm">{errorMessage}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterErrorDialog;
