'use client';

import React, { useState } from 'react';

const REPORT_REASONS = [
  {
    id: 'bad_manner',
    label: '비매너 메이트',
    details: [
      '반말을 사용하거나 관련 없는 대화를 해요',
      '불친절하게 대해요',
      '시간 약속을 안 지켜요',
      '원하지 않는 가격을 계속 요구해요',
      '거래에 있어 매너 없는 행동을 해요',
    ],
  },
  {
    id: 'fraud_suspicion',
    label: '사기 의심',
    details: [
      '입금했는데 판매자가 물건을 주지 않아요',
      '물건을 보냈는데 입금을 안해요',
      '외부 채팅으로 대화를 유도해요',
      '사기가 의심되는 정황이 있어요',
    ],
  },
  {
    id: 'abusive_language',
    label: '욕설, 비방, 혐오 표현 사용',
    details: ['부적절한 언행으로 기분이 나쁜 말을 사용해요'],
  },
  {
    id: 'sexual_harassment',
    label: '부적절한 성적 행위',
    details: [
      '이 항목으로 신고하면 자동으로 사용자를 차단해요',
      '차단 관리는 채팅방 > 설정 > 차단하기를 통해 관리할 수 있어요',
    ],
  },
  {
    id: 'etc',
    label: '기타',
    details: [
      '정치/종교적인 대화를 시도해요',
      '미성년자에게 부적절한 콘텐츠를 게시해요',
      '프로필 사진이 부적절해요',
      '닉네임이 부적절해요',
    ],
  },
];

const SELECTED_ICON = '/images/svg/register/icon-toggle-radio.svg';
const DEFAULT_ICON = '/images/svg/register/icon-toggle-radio-none.svg';

interface ReportReasonSelectionProps {
  closeSheet: () => void;
  onNext: (selectedReason: any) => void;
}

const ReportReasonSelection = ({
  closeSheet,
  onNext,
}: ReportReasonSelectionProps) => {
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedReasonId) {
      const selectedReason = REPORT_REASONS.find(
        (reason) => reason.id === selectedReasonId
      );
      onNext(selectedReason);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 제목 영역 */}
      <div className="mb-4 flex gap-2 text-[20px] font-bold leading-5 text-[#25292f]">
        <span>신고 이유를 선택해주세요.</span>
        <span className="text-[16px] font-medium text-[#f76e18]">필수</span>
      </div>

      {/* 신고 사유 선택 영역 */}
      <div className="mb-4 flex flex-col">
        {REPORT_REASONS.map((reason, index) => {
          const isSelected = selectedReasonId === reason.id;
          return (
            <div key={reason.id}>
              {/* 신고 사유 선택 버튼 */}
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedReasonId(reason.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedReasonId(reason.id);
                  }
                }}
                className="flex w-full items-center gap-2 pb-[11px] pt-3 [-webkit-tap-highlight-color:transparent]"
              >
                <img
                  src={isSelected ? SELECTED_ICON : DEFAULT_ICON}
                  alt={isSelected ? '선택됨' : '선택 안 됨'}
                  className="h-5 w-5 rounded-full"
                />
                <span
                  className={
                    isSelected
                      ? 'text-[16px] font-medium leading-5 text-gray-900'
                      : 'text-[16px] font-medium leading-5 text-gray-600'
                  }
                >
                  {reason.label}
                </span>
              </button>

              {/* 선택된 사유의 세부 항목 표시 */}
              {isSelected && (
                <div className="mb-1 ml-7 flex flex-col gap-2">
                  {reason.details.map((detail, detailIndex) => (
                    <span
                      key={detailIndex}
                      className="text-[12px] leading-[16.8px] text-gray-500"
                    >
                      - {detail}
                    </span>
                  ))}
                </div>
              )}

              {/* 마지막 항목이 아닌 경우 구분선 추가 */}
              {index < REPORT_REASONS.length - 1 && (
                <div className="my-2 h-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>

      {/* 취소, 다음 버튼 영역 */}
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
          onClick={handleNext}
          disabled={!selectedReasonId}
          className="w-full rounded-[10px] bg-[#3c8dff] text-white disabled:bg-gray-500"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ReportReasonSelection;
