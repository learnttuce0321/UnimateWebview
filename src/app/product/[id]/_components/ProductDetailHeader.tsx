'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ProductMoreMenu from './ProductMoreMenu';
import { TradeStatus } from '../page';

interface Props {
  isSeller: boolean;
  tradeStatus: TradeStatus;
  onEdit?: () => void;
  onDelete?: () => void;
  onHide?: () => void;
}

const ProductDetailHeader = ({
  isSeller,
  tradeStatus,
  onEdit,
  onDelete,
  onHide,
}: Props) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-[50px] items-center justify-between border-b bg-white pl-[13px] pr-[10px]">
      {/* 뒤로가기 */}
      <button
        className="flex h-6 w-6 items-center justify-center"
        onClick={() => router.back()}
        aria-label="뒤로가기"
      >
        <img src="/images/svg/product/arrow-back.svg" alt="" />
      </button>

      {/* 더보기(판매자 전용) */}
      {isSeller && (
        <ProductMoreMenu
          tradeStatus={tradeStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          onHide={onHide}
        />
      )}
    </header>
  );
};

export default ProductDetailHeader;
