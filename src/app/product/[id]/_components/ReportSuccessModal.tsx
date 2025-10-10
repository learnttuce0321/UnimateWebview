'use client';

import React from 'react';
import Modal from 'components/modal/Modal';

interface ReportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportSuccessModal = ({ isOpen, onClose }: ReportSuccessModalProps) => {
  return (
    <Modal
      modalState={{
        isOpened: isOpen,
        confirmText: '확인',
        children: (
          <div className="flex w-full flex-col items-start gap-2">
            <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
              메이트를 신고했어요.
            </p>
            <p className="text-[14px] font-medium leading-[16.8px] text-[#666b72]">
              신고한 메이트는 서비스 운영 정책에 따라 조치가 이루어져요.
            </p>
          </div>
        ),
      }}
      onConfirm={onClose}
      onOverlayClick={onClose}
    />
  );
};

export default ReportSuccessModal;
