import { useState, useCallback, ReactNode } from 'react';

export interface ErrorModalData {
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
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

  const handleConfirm = useCallback(() => {
    modalState.onConfirm?.();
    closeModal();
  }, [modalState, closeModal]);

  const handleCancel = useCallback(() => {
    modalState.onCancel?.();
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
