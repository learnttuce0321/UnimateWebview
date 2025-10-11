'use client';

import { MouseEvent } from 'react';
import Overlay from 'components/modal/Overlay';
import { MODAL_OR_BOTTOM_SHEET_CONTENT_Z_INDEX } from 'constants/zIndex';

interface Props {
  isOpened: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onOverlayClick: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({
  isOpened,
  children,
  onConfirm,
  onCancel,
  cancelText,
  confirmText = '확인',
  onOverlayClick,
}: Props) => {
  if (!isOpened) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onOverlayClick();
  };

  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel?.();
  };

  const handleConfirmClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <div
        className={`fixed left-1/2 top-1/2 w-[calc(100%-110px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-white p-6 px-[20px] pb-[20px] pt-[30px] z-[${MODAL_OR_BOTTOM_SHEET_CONTENT_Z_INDEX}]`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>{children}</div>
        <div className="mt-[16px] flex items-center justify-between gap-[10px] text-[16px] font-semibold leading-10">
          {cancelText && (
            <button
              className="flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#e3e9f1] text-[#a4a9b0]"
              onClick={handleCancelClick}
            >
              {cancelText}
            </button>
          )}
          <button
            className="flex h-[40px] w-full items-center justify-center rounded-[10px] bg-[#3c8dff] text-white"
            onClick={handleConfirmClick}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
