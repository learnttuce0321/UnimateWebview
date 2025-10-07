'use client';

import { useState } from 'react';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import { TradeStatusRadioConfig } from './SalesListFilterBottomSheetButton';
import SellListFilterConfirmButton from './SalesListFilterConfirmButton';
import SalesListFilterItem from './SalesListFilterItem';
import { TradeFilterStatus } from '../../page';

interface Props {
  closeSheet: () => void;
  currentTradeStatus: TradeFilterStatus;
  setCurrentTradeStatus: React.Dispatch<
    React.SetStateAction<TradeFilterStatus>
  >;
}

const SalesListFilterBottomSheet = ({
  closeSheet,
  currentTradeStatus,
  setCurrentTradeStatus,
}: Props) => {
  const [tradeFilterStatus, setTradeFilterStatus] =
    useState<TradeFilterStatus>(currentTradeStatus);

  const handleFilterClick = (filterKey: TradeFilterStatus) => {
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
            <SalesListFilterItem
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

export default SalesListFilterBottomSheet;
