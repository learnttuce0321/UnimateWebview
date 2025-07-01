'use client';

import React from 'react';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import {
  FilterType,
  FilterTypeLabel,
} from '../../_type/searchResultFilter.type';

interface Props {
  filterName: FilterType;
}

const FilterButton = ({ filterName }: Props) => {
  const openSheet = useSearchFilterBottomSheetStore((s) => s.openSheet);

  return (
    <button
      type="button"
      onClick={() => openSheet(filterName)}
      className="flex h-[30px] min-w-[79px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]"
    >
      <p className="whitespace-nowrap text-[14px] leading-[30px] text-blue_gray-900">
        {FilterTypeLabel[filterName]}
      </p>
      <img
        src="/images/svg/search/iconArrowChevronDownSmall24.svg"
        alt={FilterTypeLabel[filterName]}
        className="ml-[4px] h-[16px] w-[16px] flex-shrink-0"
      />
    </button>
  );
};
export default FilterButton;
