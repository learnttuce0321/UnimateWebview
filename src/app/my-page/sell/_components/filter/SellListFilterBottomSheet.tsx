'use client';

import { useState } from 'react';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import { TradeStatus } from 'types/Product';
import { TradeStatusRadioConfig } from './SellListFilterBottomSheetButton';

interface Props {
  isBottomSheetOpen: boolean;
  closeSheet: () => void;
  currentTradeStatus: TradeStatus;
  setCurrentTradeStatus: React.Dispatch<React.SetStateAction<TradeStatus>>;
}

const SellListFilterBottomSheet = ({
  isBottomSheetOpen,
  closeSheet,
  currentTradeStatus,
  setCurrentTradeStatus,
}: Props) => {
  const [tradeFilterStatus, setTradeFilterStatus] =
    useState<TradeStatus>(currentTradeStatus);

  if (!isBottomSheetOpen) {
    return null;
  }

  return (
    <>
      <BottomSheetDimmed closeSheet={closeSheet} />
      <BottomSheetContent closeSheet={closeSheet}>
        <h3 className="mb-[16px] text-[20px] font-bold leading-[20px] text-blue_gray-900">
          판매 내역 필터
        </h3>
        <ul className="mb-[26px] space-y-3">
          {Object.entries(TradeStatusRadioConfig).map(([key, label]) => (
            <li key={key}>
              <button
                className="flex items-center gap-[8px]"
                onClick={() => {
                  setTradeFilterStatus(key);
                }}
              >
                <img
                  src={
                    tradeFilterStatus === key
                      ? '/images/svg/my-page/icon-toggle-radio.svg'
                      : '/images/svg/my-page/icon-toggle-radio-none.svg'
                  }
                  className="h-[20px] w-[20px] rounded-full"
                  width={20}
                  height={20}
                  alt="label"
                />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mb-[10px] flex h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-white"
          onClick={() => setCurrentTradeStatus(tradeFilterStatus)}
        >
          확인
        </button>
      </BottomSheetContent>
    </>
  );
};

export default SellListFilterBottomSheet;
