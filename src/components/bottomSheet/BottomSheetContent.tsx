import React from 'react';

interface Props {
  closeSheet: () => void;
  children: React.ReactNode;
}

/**
 * 바텀 시트 컴포넌트
 * @param children 필터링 마다 바텀 시트에 보여줘야할 콘텐츠
 */
const BottomSheetContent = ({ closeSheet, children }: Props) => {
  return (
    <div className="z-modal-content fixed bottom-0 min-h-[300px] w-full rounded-t-[10px] bg-white">
      {/* 바텀 시트 상단 헤더 */}
      <div
        className="flex h-[48px] w-full cursor-pointer items-center justify-center"
        onClick={closeSheet}
      >
        <div className="h-[4px] w-[48px] cursor-pointer rounded-[20px] bg-[rgb(217,217,217)]"></div>
      </div>

      {/* 바텀 시트 콘텐츠 */}
      <div className="px-4 pb-0 pt-[10px]">{children}</div>
    </div>
  );
};

export default BottomSheetContent;
