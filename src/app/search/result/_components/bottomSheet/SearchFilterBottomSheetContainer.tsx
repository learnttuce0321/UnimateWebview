'use client';

import React from 'react';
import BottomSheetContent from 'components/bottomSheet/BottomSheetContent';
import BottomSheetDimmed from 'components/bottomSheet/BottomSheetDimmed';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import CategoryFilterContent from './filterContents/categoryFilter/CategoryFilterContent';
import ExcludeSoldFilterContent from './filterContents/excludeSoldFilter/ExcludeSoldFilterContent';
import PriceFilterContent from './filterContents/priceFilter/PriceFilterContent';
import SortFilterContent from './filterContents/sortFilter/SortFilterContent';

const SearchFilterBottomSheetContainer = () => {
  const { isOpen, openedFilter, closeSheet } =
    useSearchFilterBottomSheetStore();

  if (!isOpen || !openedFilter) return null;

  const renderContent = () => {
    switch (openedFilter) {
      case 'price':
        return <PriceFilterContent closeSheet={closeSheet} />;
      case 'categories':
        return <CategoryFilterContent closeSheet={closeSheet} />;
      case 'latest':
        return <SortFilterContent closeSheet={closeSheet} />;
      case 'excludeSold':
        return <ExcludeSoldFilterContent closeSheet={closeSheet} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 오버레이 */}
      <BottomSheetDimmed closeSheet={closeSheet} />
      {/* 전체 바텀 시트 */}
      <BottomSheetContent closeSheet={closeSheet}>
        {renderContent()}
      </BottomSheetContent>
    </>
  );
};

export default SearchFilterBottomSheetContainer;
