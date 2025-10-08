'use client';

import React, { useEffect, useState } from 'react';

interface ProductStatusBottomSheetProps {
  isOpen: boolean;
  currentStatus: string;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

const STATUS_OPTIONS = [
  { value: 'FOR_SALE', label: '판매중' },
  { value: 'RESERVED', label: '예약중' },
  { value: 'SOLD_OUT', label: '거래완료' },
];

const SELECTED_ICON = '/images/svg/register/icon-toggle-radio.svg';
const DEFAULT_ICON = '/images/svg/register/icon-toggle-radio-none.svg';

const ProductStatusBottomSheet = ({
  isOpen,
  currentStatus,
  onClose,
  onStatusChange,
}: ProductStatusBottomSheetProps) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  useEffect(() => {
    if (isOpen) setSelectedStatus(currentStatus);
  }, [isOpen, currentStatus]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedStatus !== currentStatus) onStatusChange(selectedStatus);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="bg-black/50 fixed inset-0 z-50"
        onClick={onClose}
        onTouchStart={onClose}
        aria-hidden
      />

      {/* 바텀 시트 영역 */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 translate-y-0 transform transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full max-w-screen-sm rounded-t-2xl bg-white px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-[22px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
          {/* 바텀 시트 헤더 영역 */}
          <div className="mx-auto mb-[22px] h-1 w-12 rounded-full bg-[#d9d9d9]" />

          {/* 제목 영역 */}
          <div className="mb-4 text-[20px] font-bold leading-5 text-[#25292f]">
            판매 상태를 변경하시겠어요?
          </div>

          {/* status 선택지 */}
          <div className="mb-4 flex flex-col gap-4">
            {STATUS_OPTIONS.map((option) => {
              const selected = selectedStatus === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedStatus(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStatus(option.value);
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-1 py-1 [-webkit-tap-highlight-color:transparent] active:bg-gray-50"
                >
                  <img
                    src={selected ? SELECTED_ICON : DEFAULT_ICON}
                    alt={selected ? '선택됨' : '선택 안 됨'}
                    className="h-5 w-5 rounded-full"
                  />

                  <span
                    className={
                      selected
                        ? 'text-[15px] text-gray-900'
                        : 'text-[15px] text-gray-500'
                    }
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* confirm */}
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-[10px] bg-[#3c8dff] text-[18px] font-bold leading-[50px] text-white active:bg-[#2a74ea]"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductStatusBottomSheet;
