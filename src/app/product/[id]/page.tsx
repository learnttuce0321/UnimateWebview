'use client';

import React, { useState, useEffect } from 'react';
import { useQueryProductDetail } from 'hooks/products/useQueryProductDetail';
import ProductDetailInfo from './_components/_product_detail_info/ProductDetailInfo';
import ProductBottomActions from './_components/ProductBottomActions';
import ProductDescriptionSection from './_components/ProductDescriptionSection';
import ProductDetailHeader from './_components/ProductDetailHeader';
import ProductDetailImageSlider from './_components/ProductDetailImageSlider';
import ProductSellerSection from './_components/ProductSellerSection';
import ProductStatusBottomSheet from './_components/ProductStatusBottomSheet';
import ReportBottomSheet from './_components/ReportBottomSheet';
import ReportSuccessModal from './_components/ReportSuccessModal';

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useState(false);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);
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
        onEdit={() => {
          // localStorage에 상품 데이터 저장
          localStorage.setItem(
            'editProductData',
            JSON.stringify(productDetail)
          );
          // 수정 모드로 등록 페이지 이동
          window.location.href = '/register?mode=edit';
        }}
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
        onReportClick={() => setIsReportBottomSheetOpen(true)}
      />

      {/* 고정 하단 액션 */}
      <ProductBottomActions
        isSeller={isSeller}
        onOpenChat={() => console.log('채팅하기')}
        onOpenChatList={() => console.log('채팅 목록 열기')}
        onOpenStatus={() => setIsStatusBottomSheetOpen(true)}
      />

      {/* 신고 모달 */}
      <ReportBottomSheet
        isOpen={isReportBottomSheetOpen}
        onClose={() => setIsReportBottomSheetOpen(false)}
        onSubmit={() => {
          setIsReportBottomSheetOpen(false);
          setShowReportSuccessModal(true);
        }}
      />

      {/* 신고 성공 모달 */}
      <ReportSuccessModal
        isOpen={showReportSuccessModal}
        onClose={() => setShowReportSuccessModal(false)}
      />

      {/* 상품 상태 바텀 시트 */}
      <ProductStatusBottomSheet
        isOpen={isStatusBottomSheetOpen}
        currentStatus={tradeStatus}
        onClose={() => setIsStatusBottomSheetOpen(false)}
        onStatusChange={(status) => {
          setTradeStatus(status as TradeStatus);
          setIsStatusBottomSheetOpen(false);
        }}
      />
    </div>
  );
};

export default ProductDetailPage;
