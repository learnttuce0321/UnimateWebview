'use client';

import { MODAL_CONTENT_Z_INDEX } from 'app/constants/zIndex';
import Overlay from 'components/modal/Overlay';

interface Props {
  isOpened: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onOverlayClick?: () => void;
  children: React.ReactNode;
}

const Modal = ({
  isOpened,
  children,
  onConfirm,
  onCancel,
  cancelText,
  confirmText = '확인',
  onOverlayClick = () => {},
}: Props) => {
  if (!isOpened) {
    return null;
  }

  return (
    <>
      <Overlay onClick={onOverlayClick} />
      <div
        className={`fixed left-1/2 top-1/2 w-[calc(100%-140px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-white p-6 px-[20px] pb-[20px] pt-[30px] z-[${MODAL_CONTENT_Z_INDEX}]`}
      >
        <div>{children}</div>
        <div className="mt-[16px] flex items-center justify-between gap-[10px]">
          {cancelText && (
            <button
              className="flex h-[40px] w-full items-center justify-center rounded-[10px] bg-gray-500 text-white"
              onClick={() => onCancel?.()}
            >
              {cancelText}
            </button>
          )}
          <button
            className="flex h-[40px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-white"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
