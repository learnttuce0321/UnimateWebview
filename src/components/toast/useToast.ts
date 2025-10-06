import { useState, useCallback } from 'react';
import { ToastType } from './Toast';

interface ToastState {
  message: string;
  type: ToastType;
  duration: number;
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    duration: 3000,
    isVisible: false,
  });

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      setToast({
        message,
        type,
        duration,
        isVisible: true,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};
