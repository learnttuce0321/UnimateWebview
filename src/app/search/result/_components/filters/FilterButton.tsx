import React from 'react';
import { filterType } from '../../_type/searchResultFilter';

interface Props {
  filterName: filterType;
}

const FilterButton = ({ filterName }: Props) => {
  return (
    <button
      type="button"
      className="h-[30px] flex items-center justify-between border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] min-w-[79px] pl-[12px] pr-[6px] flex-shrink-0 overflow-hidden"
    >
      <p className="text-blue_gray-900 text-[14px] leading-[30px] whitespace-nowrap">
        {filterName}
      </p>
      <img
        src="/images/svg/search/iconArrowChevronDownSmall24.svg"
        alt={filterName}
        className="w-[16px] h-[16px] ml-[4px] flex-shrink-0"
      />
    </button>
  );
};
export default FilterButton;
