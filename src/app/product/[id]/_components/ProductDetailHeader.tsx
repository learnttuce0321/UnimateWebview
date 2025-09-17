'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const ProductDetailHeader = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-[50px] items-center justify-between border-b bg-white pl-[13px] pr-[10px]">
      {/* 뒤로가기 버튼 영역 */}
      <button
        className="flex items-center justify-center w-6 h-6"
        onClick={() => router.back()}
      >
        <img src="/images/svg/product/arrow-back.svg" alt="뒤로가기" />
      </button>

      {/* 더보기 영역 */}
      <button className="flex items-center justify-center w-6 h-6">
        <img
          src="/images/svg/product/icon-system-more-vertical.svg"
          alt="더보기"
        />
      </button>
    </header>
  );
};

export default ProductDetailHeader;
