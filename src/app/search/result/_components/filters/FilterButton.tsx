import React from 'react';
import { filterType } from '../../_type/searchResultFilter';

interface Props {
  filterName: filterType;
}

const FilterButton = ({ filterName }: Props) => {
  return (
    <button
      type="button"
      className="flex gap-0 pl-[12px] pr-[6px] items-center w-auto h-[30px] border-[0.5px] rounded-[5px] border-blue_gray-400 bg-white"
    >
      <p className="w-auto h-auto font-medium text-[14px] leading-[30px] text-blue_gray-900">
        {filterName}
      </p>
      <img
        src="/images/svg/search/iconArrowChevronDownSmall24.svg"
        alt={filterName}
        className="w-[24px] h-[24px]"
      />
    </button>
  );
};

export default FilterButton;
