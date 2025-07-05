'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import {
  FilterType,
  FilterTypeLabel,
} from '../../_type/searchResultFilter.type';
import { formatNumber } from '../../../../../utils/formatNumber';

interface Props {
  filterName: FilterType;
}

const FilterButton = ({ filterName }: Props) => {
  const searchParams = useSearchParams();
  const openSheet = useSearchFilterBottomSheetStore((s) => s.openSheet);

  // 가격 필터 활성화 여부 확인
  const isFilterActive = filterName === 'price' && searchParams.get('price');

  const getDisplayText = () => {
    if (filterName === 'price') {
      const priceParam = searchParams.get('price');
      if (priceParam) {
        const formattedPrice = formatNumber(priceParam);
        return `${formattedPrice}원 이상`;
      }
    }
    return FilterTypeLabel[filterName];
  };

  return (
    <button
      type="button"
      onClick={() => openSheet(filterName)}
      className={`flex h-[30px] min-w-[79px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-solid pl-[12px] pr-[6px] ${
        isFilterActive
          ? 'border-blue-600_P bg-blue-600_P text-white'
          : 'border-blue_gray-400 bg-white'
      }`}
    >
      <p
        className={`whitespace-nowrap text-[14px] leading-[30px] ${
          isFilterActive ? 'text-white' : 'text-blue_gray-900'
        }`}
      >
        {getDisplayText()}
      </p>
      <img
        src={`/images/svg/search/iconArrowChevronDownSmall24${isFilterActive ? '-white' : ''}.svg`}
        alt={FilterTypeLabel[filterName]}
        className="ml-[4px] h-[16px] w-[16px] flex-shrink-0"
      />
    </button>
  );
};
export default FilterButton;
