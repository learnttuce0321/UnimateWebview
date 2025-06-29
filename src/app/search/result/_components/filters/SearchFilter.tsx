import React from 'react';

const SearchFilter = () => {
  return (
    <div className="h-[50px] flex items-center gap-[8px] px-[16px] w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
      <button className="flex items-center border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] min-w-[79px] pl-[12px] pr-[6px] flex-shrink-0">
        <p className="text-blue_gray-900 text-[14px] leading-[30px]">대학교</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex items-center border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] pl-[12px] pr-[6px] flex-shrink-0">
        <p className="text-blue_gray-900 text-[14px] leading-[30px]">가격</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex items-center border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] pl-[12px] pr-[6px] flex-shrink-0">
        <p className="text-blue_gray-900 text-[14px] leading-[30px]">
          카테고리
        </p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex items-center border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] pl-[12px] pr-[6px] flex-shrink-0">
        <p className="text-blue_gray-900 text-[14px] leading-[30px]">최신순</p>
        <img
          src="/images/svg/search/iconArrowChev"
          alt="dropdown icon"
          width={24}
          height={24}
        />
      </button>
      <button className="flex items-center border-[0.5px] border-solid border-blue_gray-400 rounded-[5px] pl-[12px] pr-[6px] flex-shrink-0">
        <p className="text-blue_gray-900 text-[14px] leading-[30px]">
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
