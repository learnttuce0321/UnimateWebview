'use client';

import React, { useState } from 'react';

interface ReportDetailInputProps {
  closeSheet: () => void;
  selectedReason: any;
  onBack: () => void;
  onSubmit: (data: { reason: any; detail: string }) => void;
}

const ReportDetailInput = ({
  closeSheet,
  selectedReason,
  onBack,
  onSubmit,
}: ReportDetailInputProps) => {
  const [detailText, setDetailText] = useState('');

  const handleSubmit = () => {
    onSubmit({
      reason: selectedReason,
      detail: detailText.trim(),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 선택된 신고 사유 표시 */}
      <span className="text-[20px] font-bold leading-4 text-blue_gray-900">
        {selectedReason?.label}
      </span>

      {/* 상세 내용 입력 영역 */}
      <div className="flex flex-col justify-center gap-4">
        <label className="text-[14px] font-normal leading-[22.4px] text-blue_gray-600">
          <div>• 허위 신고 시 제재를 받을 수 있습니다.</div>
          <div>• 신고 접수 후 검토까지 시간이 소요될 수 있습니다.</div>
          <div>• 신고 결과는 별도로 안내되지 않습니다.</div>
        </label>

        <textarea
          value={detailText}
          onChange={(e) => setDetailText(e.target.value)}
          placeholder="신고 내용을 입력해주세요."
          className="h-32 w-full resize-none rounded-lg border border-[#c1c7cf] px-[10px] py-2 text-[14px] text-blue_gray-900 placeholder:text-blue_gray-600 focus:outline-none"
          maxLength={300}
        />
        <div className="text-right text-[12px] leading-[16.8px] text-blue_gray-600">
          {detailText.length}/300
        </div>
      </div>

      {/* 취소 및 신고하기 버튼 영역 */}
      <div className="mb-[10px] flex flex-1 items-center justify-center gap-2 text-[18px] font-bold leading-[50px]">
        <button
          type="button"
          onClick={closeSheet}
          className="w-full rounded-[10px] bg-[#e3e9f1] text-[#9e9e9e]"
        >
          취소
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!detailText}
          className="w-full rounded-[10px] bg-[#3c8dff] text-white disabled:bg-gray-500"
        >
          신고하기
        </button>
      </div>
    </div>
  );
};

export default ReportDetailInput;
