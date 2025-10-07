'use client';

import { useState } from 'react';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import { TradeStatus } from 'types/Product';
import { TradeStatusRadioConfig } from './SellListFilterBottomSheetButton';
import SellListFilterConfirmButton from './SellListFilterConfirmButton';
import SellListFilterItem from './SellListFilterItem';

interface Props {
  closeSheet: () => void;
  currentTradeStatus: TradeStatus;
  setCurrentTradeStatus: React.Dispatch<React.SetStateAction<TradeStatus>>;
}

const SellListFilterBottomSheet = ({
  closeSheet,
  currentTradeStatus,
  setCurrentTradeStatus,
}: Props) => {
  const [tradeFilterStatus, setTradeFilterStatus] =
    useState<TradeStatus>(currentTradeStatus);

  const handleFilterClick = (filterKey: TradeStatus) => {
    setTradeFilterStatus(filterKey);
  };

  const handleConfirmClick = () => {
    setCurrentTradeStatus(tradeFilterStatus);
    closeSheet();
  };

  return (
    <>
      <BottomSheetDimmed closeSheet={closeSheet} />
      <BottomSheetContent closeSheet={closeSheet}>
        <h3 className="mb-[16px] text-[20px] font-bold leading-[20px] text-blue_gray-900">
          판매 내역 필터
        </h3>
        <ul className="mb-[26px] space-y-3">
          {Object.entries(TradeStatusRadioConfig).map(([key, label]) => (
            <SellListFilterItem
              key={key}
              filterKey={key}
              filterLabel={label}
              tradeFilterStatus={tradeFilterStatus}
              onClick={handleFilterClick}
            />
          ))}
        </ul>
        <SellListFilterConfirmButton onClick={handleConfirmClick} />
      </BottomSheetContent>
    </>
  );
};

export default SellListFilterBottomSheet;
