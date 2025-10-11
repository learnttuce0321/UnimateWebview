'use client';

import { useState } from 'react';
import NavigationBar from 'components/navigation/NavigationBar';
import SalesListFilterBottomSheetButton from './_components/filter/SalesListFilterBottomSheetButton';
import SalesList from './_components/product/SalesList';

export type TradeFilterStatus = 'ALL' | 'FOR_SALE' | 'COMPLETED' | 'HIDDEN';

const Page = () => {
  const [currentTradeStatus, setCurrentTradeStatus] =
    useState<TradeFilterStatus>('ALL');

  return (
    <>
      <NavigationBar title="판매 내역" />
      <div className="relative min-h-[calc(100vh-50px)] w-full bg-gray-50 pt-[16px]">
        <SalesListFilterBottomSheetButton
          currentTradeStatus={currentTradeStatus}
          setCurrentTradeStatus={setCurrentTradeStatus}
        />
        <SalesList tradeStatus={currentTradeStatus} />
      </div>
    </>
  );
};

export default Page;
