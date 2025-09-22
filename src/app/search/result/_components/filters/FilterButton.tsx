'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import {
  FilterType,
  FilterTypeLabel,
} from '../../_type/searchResultFilter.type';
import { formatNumber } from '../../../../../utils/formatNumber';
import { categoryTestData } from '../../../../testDatas/categoryTestData';

interface Props {
  filterName: FilterType;
}

// 필터별 설정 객체
const FILTER_CONFIGS = {
  price: {
    paramKey: 'minPrice',
    formatDisplayText: (value: string) => `${formatNumber(value)}원 이상`,
  },
  category: {
    paramKey: 'category',
    formatDisplayText: (value: string) => {
      const categoryItem = categoryTestData.find(
        (item) => item.categoryEN === value
      );
      return categoryItem ? categoryItem.category : value;
    },
  },
  latest: {
    paramKey: 'sort',
    formatDisplayText: (value: string) => {
      const sortLabels = {
        latest: '최신순',
        oldest: '오래된순',
      };
      return sortLabels[value as keyof typeof sortLabels] || value;
    },
  },
  excludeSold: {
    paramKey: 'excludeSold',
    formatDisplayText: (value: string) => {
      const excludeSoldLabels = {
        exclude_completed: '거래완료 제외',
        include_completed: '거래완료 포함',
      };
      return (
        excludeSoldLabels[value as keyof typeof excludeSoldLabels] || value
      );
    },
  },
} as const;

const FilterButton = ({ filterName }: Props) => {
  const searchParams = useSearchParams();
  const openSheet = useSearchFilterBottomSheetStore((s) => s.openSheet);

  // 현재 필터의 설정 가져오기
  const filterConfig =
    FILTER_CONFIGS[filterName as keyof typeof FILTER_CONFIGS];

  // 필터 활성화 여부 확인
  const paramValue = filterConfig
    ? searchParams.get(filterConfig.paramKey)
    : null;
  const isFilterActive = Boolean(paramValue);

  const getDisplayText = () => {
    if (filterConfig && paramValue) {
      return filterConfig.formatDisplayText(paramValue);
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
