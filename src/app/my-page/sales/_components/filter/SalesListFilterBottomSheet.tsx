'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import { TradeStatusRadioConfig } from './SalesListFilterBottomSheetButton';
import SellListFilterConfirmButton from './SalesListFilterConfirmButton';
import SalesListFilterItem from './SalesListFilterItem';
import { TradeFilterStatus } from '../../page';

interface Props {
  closeSheet: () => void;
}

const SalesListFilterBottomSheet = ({ closeSheet }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tradeFilterStatus, setTradeFilterStatus] = useState<TradeFilterStatus>(
    (searchParams.get('tradeFilterStatus') as TradeFilterStatus) || 'ALL'
  );

  const handleFilterClick = (filterKey: TradeFilterStatus) => {
    setTradeFilterStatus(filterKey);
  };

  const handleConfirmClick = () => {
    // URL에 query parameter 추가
    const params = new URLSearchParams();
    params.set('tradeFilterStatus', tradeFilterStatus);
    router.replace(`/my-page/sales?${params.toString()}`);

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
              filterKey={key as TradeFilterStatus}
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
