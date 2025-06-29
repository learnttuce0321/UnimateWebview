import React from 'react';
import FilterButton from './FilterButton';

// TODO : 공통 필터 Button style 만든다음에 넣기
const SearchResultFilters = () => {
  return (
    <ul className="h-[50px] flex items-center gap-[8px] px-[16px] w-full overflow-x-auto overflow-y-hidden no-scrollbar">
      <li className="flex items-center gap-0 min-w-[79px] flex-shrink-0">
        {/* 대학교 바텀 시트가 열려야 함 -> 이번 스프린트(9) 항목 아님 제외 */}
        <FilterButton filterName="대학교" />
      </li>
      <li>
        <FilterButton filterName="가격" />
      </li>
      <li>
        <FilterButton filterName="카테고리" />
      </li>
      <li>
        <FilterButton filterName="최신순" />
      </li>
      <li>
        <FilterButton filterName="거래완료 제외" />
      </li>
    </ul>
  );
};

export default SearchResultFilters;
