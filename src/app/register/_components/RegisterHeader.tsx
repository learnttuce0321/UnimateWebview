'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function RegisterHeader() {
  const router = useRouter();

  const handleClickCloseButton = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 flex items-center h-[50px] bg-white px-4">
      <h2 className="absolute inset-x-0 pointer-events-none flex justify-center text-[18px] font-bold text-blue_gray-900">
        물건 등록하기
      </h2>
      <img
        src="/images/svg/icon-system-close.svg"
        alt="닫기 버튼"
        onClick={handleClickCloseButton}
        className="w-[24px] ml-auto cursor-pointer"
      />
    </div>
  );
}
