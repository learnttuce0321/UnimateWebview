'use client';

import { useState } from 'react';
import SalesListFilterBottomSheet from './SalesListFilterBottomSheet';
import { TradeFilterStatus } from '../../page';

export const TradeStatusRadioConfig: Record<TradeFilterStatus, string> = {
  ALL: '전체',
  FOR_SALE: '판매중',
  SOLD_OUT: '거래완료',
  HIDDEN: '숨김',
};

interface Props {
  currentTradeStatus: TradeFilterStatus;
  setCurrentTradeStatus: React.Dispatch<
    React.SetStateAction<TradeFilterStatus>
  >;
}

const SalesListFilterBottomSheetButton = ({
  currentTradeStatus,
  setCurrentTradeStatus,
}: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-[50px] w-full justify-end px-[16px] py-[10px]">
        <button
          className="flex items-center justify-center border-[0.5px] border-blue_gray-400 bg-white pl-[12px] pr-[6px]"
          onClick={() => setIsBottomSheetOpen(true)}
        >
          <span className="text-[14px] leading-[30px] text-blue_gray-900">
            {TradeStatusRadioConfig[currentTradeStatus]}
          </span>
          <img
            src="/images/svg/my-page/icon-arrow-chevron-down-small-24.svg"
            width={24}
            height={24}
            alt="더보기"
          />
        </button>
      </div>
      {isBottomSheetOpen && (
        <SalesListFilterBottomSheet
          closeSheet={() => setIsBottomSheetOpen(false)}
          currentTradeStatus={currentTradeStatus}
          setCurrentTradeStatus={setCurrentTradeStatus}
        />
      )}
    </>
  );
};

export default SalesListFilterBottomSheetButton;
