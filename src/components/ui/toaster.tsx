
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
  
  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <Toast 
            key={id} 
            style={{ opacity: 1 }} 
            className="border-none shadow-lg rounded-lg bg-white dark:bg-gray-900"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base font-medium">{title}</ToastTitle>}
              {description && <ToastDescription className="text-sm text-muted-foreground">{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="fixed bottom-4 right-4 flex flex-col gap-2 max-w-sm bg-transparent" />
    </ToastProvider>
  );
}
