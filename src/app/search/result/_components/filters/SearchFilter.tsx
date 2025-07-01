import React from 'react';

const SearchFilter = () => {
  return (
    <div className="scrollbar-hide flex h-[50px] w-full items-center gap-[8px] overflow-x-auto overflow-y-hidden px-[16px]">
      <button className="flex min-w-[79px] flex-shrink-0 items-center rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]">
        <p className="text-[14px] leading-[30px] text-blue_gray-900">대학교</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex flex-shrink-0 items-center rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]">
        <p className="text-[14px] leading-[30px] text-blue_gray-900">가격</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex flex-shrink-0 items-center rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]">
        <p className="text-[14px] leading-[30px] text-blue_gray-900">
          카테고리
        </p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex flex-shrink-0 items-center rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]">
        <p className="text-[14px] leading-[30px] text-blue_gray-900">최신순</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex flex-shrink-0 items-center rounded-[5px] border-[0.5px] border-solid border-blue_gray-400 pl-[12px] pr-[6px]">
        <p className="text-[14px] leading-[30px] text-blue_gray-900">
          거래완료 제외
        </p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default SearchFilter;
