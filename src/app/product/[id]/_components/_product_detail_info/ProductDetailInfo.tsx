'use client';

import React, { useState, useEffect } from 'react';
import {
  useMutationLikeProduct,
  useMutationUnlikeProduct,
} from 'hooks/products/useMutationLikeProduct';
import ProductDetailInfoHeader from './ProductDetailInfoHeader';
import ProductDetailInfoLikeShare from './ProductDetailInfoLikeShare';
import Divider from 'app/_components/Divider';
import { TradeStatus } from '../../page';

interface Props {
  id: number;
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
  id,
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

  const likeMutation = useMutationLikeProduct();
  const unlikeMutation = useMutationUnlikeProduct();

  // API 데이터가 변경되면 상태 동기화
  useEffect(() => {
    setCurrentLikeCount(likeCount);
    setIsLiked(initialIsLiked);
  }, [likeCount, initialIsLiked]);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        setCurrentLikeCount((prev) => prev - 1);
        setIsLiked(false);
        await unlikeMutation.mutateAsync(id);
      } else {
        setCurrentLikeCount((prev) => prev + 1);
        setIsLiked(true);
        await likeMutation.mutateAsync(id);
      }
    } catch (error) {
      if (isLiked) {
        setCurrentLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setCurrentLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
      console.error('천하기 에러:', error);
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
