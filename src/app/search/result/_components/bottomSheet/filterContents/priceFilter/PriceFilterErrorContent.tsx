import React from 'react';
import TitleBottomSheet from './TitleBottomSheet';

interface Props {
  errorMessage: string;
  closeSheet: () => void;
}

const PriceFilterErrorContent = ({ errorMessage, closeSheet }: Props) => {
  const displayMessage = errorMessage || '가격 정보를 불러오는데 실패했습니다.';

  return (
    <div className="flex h-full w-full flex-col">
      <TitleBottomSheet title="가격" />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-8">
        {/* 에러 아이콘 */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 에러 메시지 */}
        <div className="text-center">
          <p className="break-words px-4 text-sm leading-relaxed text-gray-700">
            {displayMessage}
          </p>
        </div>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={closeSheet}
          className="w-full rounded-[10px] bg-blue-600_P py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PriceFilterErrorContent;
