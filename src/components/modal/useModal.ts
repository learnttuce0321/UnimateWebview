import { useState, useCallback, ReactNode } from 'react';

export interface ErrorModalData {
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export interface ErrorModalState extends ErrorModalData {
  isOpened: boolean;
}

export const useModal = () => {
  const [modalState, setModalState] = useState<ErrorModalState>({
    isOpened: false,
    children: null,
  });

  const openModal = useCallback((data: ErrorModalData) => {
    setModalState({
      isOpened: true,
      ...data,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      isOpened: false,
    }));
  }, []);

  const handleConfirm = useCallback(async () => {
    await modalState.onConfirm?.();
    closeModal();
  }, [modalState, closeModal]);

  const handleCancel = useCallback(async () => {
    await modalState.onCancel?.();
    closeModal();
  }, [modalState, closeModal]);

  return {
    modalState,
    openModal,
    closeModal,
    handleConfirm,
    handleCancel,
  };
};
