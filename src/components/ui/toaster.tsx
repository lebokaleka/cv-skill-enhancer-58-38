
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const {
    toasts
  } = useToast();
  return <ToastProvider>
      {toasts.map(function ({
      id,
      title,
      description,
      action,
      ...props
    }) {
      return <Toast key={id} className="border border-gray-800 shadow-lg rounded-lg bg-gray-950 text-white">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-white font-medium">{title}</ToastTitle>}
              {description && <ToastDescription className="text-gray-200">{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>;
    })}
      <ToastViewport className="bg-transparent" />
    </ToastProvider>;
}
