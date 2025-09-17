'use client';

import React from 'react';
import ProductDetailInfoHeader from './ProductDetailInfoHeader';
import ProductDetailInfoLikeShare from './ProductDetailInfoLikeShare';
import Divider from 'app/_components/Divider';
import { TradeStatus } from '../../page';

interface Props {
  title: string;
  price: number;
  currencyType: string;
  createdAt: string;
  likeCount: number;
  chatRoomCount: number;
  tradeStatus: TradeStatus;
}

const ProductDetailInfo = ({
  title,
  price,
  currencyType,
  createdAt,
  likeCount,
  chatRoomCount,
  tradeStatus,
}: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4 px-4 pt-4">
      {/* 헤더 영역 */}
      <ProductDetailInfoHeader
        title={title}
        price={price}
        currencyType={currencyType}
        createdAt={createdAt}
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
        tradeStatus={tradeStatus}
      />

      {/* 찜하기 & 공유하기 버튼 */}
      <ProductDetailInfoLikeShare />

      {/* 구분선 */}
      <Divider />
    </div>
  );
};

export default ProductDetailInfo;
