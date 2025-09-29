'use client';

import React, { useState } from 'react';
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
  isLiked?: boolean;
  category: string;
}

const ProductDetailInfo = ({
  title,
  price,
  currencyType,
  createdAt,
  likeCount,
  chatRoomCount,
  tradeStatus,
  isLiked: initialIsLiked = false,
  category,
}: Props) => {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLikeToggle = () => {
    if (isLiked) {
      setCurrentLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setCurrentLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };
  return (
    <div className="flex flex-col justify-center gap-4 px-4 pt-4">
      {/* 헤더 영역 */}
      <ProductDetailInfoHeader
        title={title}
        price={price}
        currencyType={currencyType}
        createdAt={createdAt}
        likeCount={currentLikeCount}
        chatRoomCount={chatRoomCount}
        tradeStatus={tradeStatus}
        category={category}
      />

      {/* 찜하기 & 공유하기 버튼 */}
      <ProductDetailInfoLikeShare
        isLiked={isLiked}
        onLikeToggle={handleLikeToggle}
      />

      {/* 구분선 */}
      <Divider />
    </div>
  );
};

export default ProductDetailInfo;
