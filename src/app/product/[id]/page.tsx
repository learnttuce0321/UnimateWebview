'use client';

import React, { useState, useEffect } from 'react';
import { useQueryProductDetail } from 'hooks/products/useQueryProductDetail';
import ProductDetailHeader from './_components/ProductDetailHeader';
import ProductDetailImageSlider from './_components/ProductDetailImageSlider';
import ProductDetailInfo from './_components/_product_detail_info/ProductDetailInfo';
import ReportModal from './_components/ReportModal';
import ProductStatusBottomSheet from './_components/ProductStatusBottomSheet';
import ProductSellerSection from './_components/ProductSellerSection';
import ProductDescriptionSection from './_components/ProductDescriptionSection';
import ProductBottomActions from './_components/ProductBottomActions';

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [tradeStatus, setTradeStatus] = useState<TradeStatus>('FOR_SALE');

  // API 호출
  const {
    data: productDetail,
    isLoading,
    error,
  } = useQueryProductDetail(params.id);

  // productDetail이 로드되면 tradeStatus 업데이트
  useEffect(() => {
    if (productDetail) {
      setTradeStatus(productDetail.tradeStatus as TradeStatus);
    }
  }, [productDetail]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !productDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-500">
          상품 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  const isSeller = productDetail.isOwner;

  const productData = {
    id: productDetail.id,
    title: productDetail.title,
    price: productDetail.price,
    currencyType: productDetail.currencyType,
    tradeStatus: productDetail.tradeStatus as TradeStatus,
    description: productDetail.description,
    images: productDetail.imageUrls,
    universityName: productDetail.universityName,
    createdAt: productDetail.createdAt,
    likeCount: productDetail.likeCount,
    chatRoomCount: productDetail.chatRoomCount,
    seller: {
      name: productDetail.sellerNickname,
      profileImage: productDetail.sellerProfileImageUrl,
    },
    category: productDetail.category,
  };

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      {/* 헤더 뒤로가기 및 더보기 버튼 */}
      <ProductDetailHeader
        productId={productDetail.id}
        isSeller={isSeller}
        tradeStatus={tradeStatus}
        isHidden={productDetail.isHidden}
        onEdit={() => console.log('수정하기')}
      />

      {/* 상품 이미지 스와이프 */}
      <ProductDetailImageSlider images={productData.images} />

      {/* 상품 정보(카테고리, 제목, 가격, 상태, 날짜) 및 찜하기 & 공유하기 버튼 */}
      <ProductDetailInfo
        {...productData}
        tradeStatus={tradeStatus}
        isLiked={productDetail.isLiked}
      />

      {/* 판매자 정보 영역 (구매자 유저에게만 보이는 영역) */}
      {!isSeller && <ProductSellerSection {...productData} />}

      {/* 상품 상세 설명 영역 */}
      <ProductDescriptionSection
        {...productData}
        onReportClick={() => setIsReportModalOpen(true)}
      />

      {/* 고정 하단 액션 */}
      <ProductBottomActions
        isSeller={isSeller}
        onOpenChat={() => console.log('채팅하기')}
        onOpenChatList={() => console.log('채팅 목록 열기')}
        onOpenStatus={() => setIsStatusModalOpen(true)}
      />

      {/* 신고 모달 */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={(reason) => {
          console.log('신고 사유:', reason);
          setIsReportModalOpen(false);
        }}
      />

      <ProductStatusBottomSheet
        isOpen={isStatusModalOpen}
        currentStatus={tradeStatus}
        onClose={() => setIsStatusModalOpen(false)}
        onStatusChange={(status) => {
          setTradeStatus(status as TradeStatus);
          setIsStatusModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProductDetailPage;
