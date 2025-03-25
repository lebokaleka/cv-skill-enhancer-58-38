
import { useEffect, useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ErrorNotificationProps {
  isOpen: boolean;
  error: string | null;
  onOpenChange: (open: boolean) => void;
  dialogKey: number;
}

const ErrorNotification = ({ 
  isOpen, 
  error, 
  onOpenChange,
  dialogKey
}: ErrorNotificationProps) => {
  useEffect(() => {
    // Auto-hide notification after 3 seconds
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onOpenChange(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onOpenChange]);

  return (
    <Dialog 
      key={dialogKey}
      open={isOpen} 
      onOpenChange={onOpenChange}
    >
      <DialogContent 
        variant="notification" 
        className="fixed bottom-4 right-4 top-auto left-auto transform-none border-none shadow-lg"
      >
        <DialogTitle className="text-base font-medium">Missing information</DialogTitle>
        <DialogDescription className="text-sm">{error}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorNotification;
