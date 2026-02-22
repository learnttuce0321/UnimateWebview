'use client';

import React from 'react';

interface ReportSuccessModalProps {
  userBlocked?: boolean;
}

const ReportSuccessModal = ({ userBlocked }: ReportSuccessModalProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
        이 메이트를 신고했어요.
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-[#666b72]">
        신고한 메이트는 서비스 운영 정책에 따라 조치가 이루어져요.
      </p>
      {userBlocked && (
        <p className="text-[12px] text-red-500">이 사용자는 차단되었습니다.</p>
      )}
    </div>
  );
};

export default ReportSuccessModal;
