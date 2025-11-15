'use client';

import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMutationLikeProduct } from 'hooks/products/useMutationLikeProduct';
import { useMutationUnlikeProduct } from 'hooks/products/useMutationUnlikeProduct';
import navigationScheme from 'utils/navigationScheme';
import Divider from '../Divider';
import ProductDetailInfoHeader from './ProductDetailInfoHeader';
import ProductDetailInfoLikeShare from './ProductDetailInfoLikeShare';
import { TradeStatus } from '../../page';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { MAIN_PAGE_UPDATE_PRODUCTS_LIKE } from 'constants/storageSyncKeyFactory/main';

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

  const queryClient = useQueryClient();
  const likeMutation = useMutationLikeProduct();
  const unlikeMutation = useMutationUnlikeProduct();
  const { shareContent } = navigationScheme();

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
        await unlikeMutation.mutateAsync(
          { productId: id },
          {
            onSuccess: (_, productId) => {
              // 상품 상세 정보 캐시 무효화
              queryClient.invalidateQueries({
                queryKey: ['product-detail', productId.toString()],
              });
              // 상품 목록 캐시도 무효화 (찜 수가 변경되어야 함)
              queryClient.invalidateQueries({
                queryKey: ['products'],
              });
              setLocalStorageAndSync(MAIN_PAGE_UPDATE_PRODUCTS_LIKE, {
                productId: id,
                updateType: 'unlike',
              });
            },
          }
        );
      } else {
        setCurrentLikeCount((prev) => prev + 1);
        setIsLiked(true);
        await likeMutation.mutateAsync(
          { productId: id },
          {
            onSuccess: (_, productId) => {
              // 상품 상세 정보 캐시 무효화
              queryClient.invalidateQueries({
                queryKey: ['product-detail', productId.toString()],
              });
              // 상품 목록 캐시도 무효화 (찜 수가 변경되어야 함)
              setLocalStorageAndSync(MAIN_PAGE_UPDATE_PRODUCTS_LIKE, {
                productId: id,
                updateType: 'like',
              });
            },
          }
        );
      }
    } catch (error) {
      if (isLiked) {
        setCurrentLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setCurrentLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
      console.error('찜하기 에러:', error);
    }
  };

  const handleShare = () => {
    const url = `${location.origin}/product/${id}`;
    const shareTitle = title;
    const message = `유니메이트에서 ${title}을 확인해보세요!`;

    shareContent(url, shareTitle, message);
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
        onShare={handleShare}
      />

      {/* 구분선 */}
      <Divider />
    </div>
  );
};

export default ProductDetailInfo;
