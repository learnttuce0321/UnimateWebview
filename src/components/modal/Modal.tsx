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
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-[10px] pt-[30px] pb-[20px] px-[20px] w-[250px] max-w-md z-[${MODAL_CONTENT_Z_INDEX}]`}
      >
        <div>{children}</div>
        <div className="flex justify-between items-center gap-[10px] mt-[16px]">
          {cancelText && (
            <button
              className="h-[40px] bg-gray-500 text-white rounded-[10px] w-full flex justify-center items-center"
              onClick={() => onCancel?.()}
            >
              {cancelText}
            </button>
          )}
          <button
            className="h-[40px] bg-blue-600_P text-white rounded-[10px] w-full flex justify-center items-center"
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
