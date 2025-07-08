'use client';

import React from 'react';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import BottomSheetDimmed from './BottomSheetDimmed';
import FilterBottomSheet from './FilterBottomSheet';
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
      case 'category':
        return <CategoryFilterContent closeSheet={closeSheet} />;
      case 'latest':
        return <SortFilterContent closeSheet={closeSheet} />;
      case 'excludeSold':
        return <ExcludeSoldFilterContent />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 오버레이 */}
      <BottomSheetDimmed closeSheet={closeSheet} />
      {/* 전체 바텀 시트 */}
      <FilterBottomSheet closeSheet={closeSheet}>
        {renderContent()}
      </FilterBottomSheet>
    </>
  );
};

export default SearchFilterBottomSheetContainer;
