import React from 'react';
import FilterButton from './FilterButton';
import UniversityFilterButton from './UniversityFilterButton';
import { FilterType } from '../../_type/searchResultFilter.type';
import { FilteringUniversity } from '../../page';

interface Props {
  currentFilteringUniversity: FilteringUniversity | null;
  handleChangeUniversity: (
    universityId: number,
    universityName: string
  ) => void;
}
// 대학교 필터는 하단 바텀 시트를 노출하지 않는 개별 페이지로 열리는 것
export const FILTERS: FilterType[] = [
  'price',
  'categories',
  'latest',
  'excludeSold',
];

const SearchResultFilters = ({
  currentFilteringUniversity,
  handleChangeUniversity,
}: Props) => {
  return (
    <ul className="no-scrollbar flex h-[50px] w-full items-center gap-[8px] overflow-x-auto overflow-y-hidden px-[16px]">
      {/* 대학교 필터 (렌더링만 하고 액션 제외) */}
      <li className="flex min-w-[79px] flex-shrink-0 items-center gap-0">
        <UniversityFilterButton
          currentFilteringUniversity={currentFilteringUniversity}
          handleChangeUniversity={handleChangeUniversity}
        />
      </li>

      {FILTERS.map((filterKey) => (
        <li key={filterKey}>
          <FilterButton filterName={filterKey} />
        </li>
      ))}
    </ul>
  );
};

export default SearchResultFilters;
