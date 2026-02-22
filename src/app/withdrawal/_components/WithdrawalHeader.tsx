'use client';

import React from 'react';
import navigationScheme from 'utils/navigationScheme';

const WithdrawalHeader = () => {
  const { closeWeb } = navigationScheme();

  return (
    <header className="sticky top-0 z-50 flex h-[50px] items-center justify-between bg-white pl-[13px] pr-[10px]">
      {/* 뒤로가기 */}
      <button
        className="flex h-6 w-6 items-center justify-center"
        onClick={closeWeb}
        aria-label="뒤로가기"
      >
        <img src="/images/svg/product/arrow-back.svg" alt="" />
      </button>

      {/* 제목 */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold text-blue_gray-900">
        회원 탈퇴
      </h1>
    </header>
  );
};

export default WithdrawalHeader;
