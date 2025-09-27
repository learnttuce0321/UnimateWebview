'use client';

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Props {
  message: string;
  type?: ToastType;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  isVisible,
  onClose,
}: Props) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = 'px-[16px] py-[12px] rounded-[8px] shadow-lg';

    switch (type) {
      // case 'success':
      //   return `${baseStyles} bg-green-500 text-white`;
      // case 'error':
      //   return `${baseStyles} bg-red-500 text-white`;
      // case 'warning':
      //   return `${baseStyles} bg-yellow-500 text-black`;
      default:
        return `${baseStyles} bg-blue_gray-900 text-white`;
    }
  };

  return (
    <div
      className={`fixed bottom-[80px] left-[16px] right-[16px] z-50 transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className={getToastStyles()}>
        <p className="text-center text-[14px] leading-[20px]">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
