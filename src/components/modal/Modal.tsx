'use client';

import ModalLayout from './ModalLayout';
import { ErrorModalState } from './useModal';

interface Props {
  modalState: ErrorModalState;
  onConfirm: () => void;
  onCancel?: () => void;
  onOverlayClick?: () => void;
}

const Modal = ({
  modalState,
  onConfirm,
  onCancel,
  onOverlayClick = () => {},
}: Props) => {
  const { isOpened, confirmText, cancelText, children } = modalState;

  if (!isOpened) {
    return null;
  }

  return (
    <ModalLayout
      isOpened={isOpened}
      confirmText={confirmText}
      cancelText={cancelText}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onOverlayClick={onOverlayClick}
    >
      {children}
    </ModalLayout>
  );
};

export default Modal;
