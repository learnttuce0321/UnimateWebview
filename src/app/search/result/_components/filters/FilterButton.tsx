'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { categoryData } from 'constants/categoryData';
import { useSearchFilterBottomSheetStore } from 'stores/searchFilterBottomSheet.store';
import { formatNumber } from 'utils/formatNumber';
import {
  FilterType,
  FilterTypeLabel,
} from '../../_type/searchResultFilter.type';

interface Props {
  filterName: FilterType;
}

// 필터별 설정 객체
const FILTER_CONFIGS = {
  price: {
    paramKey: ['minPrice', 'maxPrice'],
    formatDisplayText: (
      minPrice: string,
      maxPrice?: string,
      currencyType?: string
    ) => {
      const isUSD = currencyType === 'USD';

      if (minPrice && maxPrice) {
        return isUSD
          ? `$${formatNumber(minPrice)}-$${formatNumber(maxPrice)}`
          : `${formatNumber(minPrice)}원-${formatNumber(maxPrice)}원`;
      }
      if (minPrice) {
        return isUSD
          ? `$${formatNumber(minPrice)} 이상`
          : `${formatNumber(minPrice)}원 이상`;
      }
      if (maxPrice) {
        return isUSD
          ? `$${formatNumber(maxPrice)} 이하`
          : `${formatNumber(maxPrice)}원 이하`;
      }
      return '';
    },
  },
  category: {
    paramKey: 'category',
    formatDisplayText: (value: string) => {
      const categoryItem = categoryData.find(
        (item) => item.categoryEN === value
      );
      return categoryItem ? categoryItem.category : value;
    },
  },
  latest: {
    paramKey: 'sort',
    formatDisplayText: (value: string) => {
      const sortLabels = {
        DESC: '최신순',
        ASC: '오래된순',
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

  // 필터 활성화 여부 및 값 확인
  const getParamValues = () => {
    if (!filterConfig) return null;

    // price 필터는 두 개의 파라미터 확인
    if (filterName === 'price') {
      const minPrice = searchParams.get('minPrice');
      const maxPrice = searchParams.get('maxPrice');
      return { minPrice, maxPrice };
    }

    // 다른 필터는 단일 파라미터
    const paramKey = filterConfig.paramKey as string;
    const value = searchParams.get(paramKey);
    return value;
  };

  const paramValues = getParamValues();

  // 필터 활성화 여부 확인
  const isFilterActive =
    filterName === 'price'
      ? Boolean(
          (
            paramValues as {
              minPrice: string | null;
              maxPrice: string | null;
            }
          )?.minPrice ||
            (
              paramValues as {
                minPrice: string | null;
                maxPrice: string | null;
              }
            )?.maxPrice
        )
      : Boolean(paramValues);

  const getDisplayText = () => {
    if (!filterConfig || !paramValues) {
      return FilterTypeLabel[filterName];
    }

    // price 필터 처리
    if (filterName === 'price') {
      const { minPrice, maxPrice } = paramValues as {
        minPrice: string | null;
        maxPrice: string | null;
      };
      if (minPrice || maxPrice) {
        // currencyType 파라미터 가져오기
        const currencyType = searchParams.get('currencyType') || 'KRW';
        return filterConfig.formatDisplayText(
          minPrice || '',
          maxPrice || undefined,
          currencyType
        );
      }
      return FilterTypeLabel[filterName];
    }

    // 다른 필터 처리
    if (paramValues && typeof paramValues === 'string') {
      return filterConfig.formatDisplayText(paramValues);
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
