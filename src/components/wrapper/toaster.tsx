import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../shared/toast.tsx';
import { useToast } from '../../hooks/use-toast.tsx';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={1500}>
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
