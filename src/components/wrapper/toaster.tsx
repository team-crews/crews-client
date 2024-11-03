import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../shadcn/toast.tsx';
import { useToast } from '../../hooks/use-toast.ts';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={3000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <ToastTitle className="text-sm font-medium">{title}</ToastTitle>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
