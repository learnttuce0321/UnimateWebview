'use client';

import React, { useState } from 'react';
import ProductDetailHeader from './_components/ProductDetailHeader';
import ProductDetailImageSlider from './_components/ProductDetailImageSlider';
import ProductDetailInfo from './_components/_product_detail_info/ProductDetailInfo';
import ReportModal from './_components/ReportModal';
import ProductStatusModal from './_components/ProductStatusModal';
import ProductSellerSection from './_components/ProductSellerSection';
import ProductDescriptionSection from './_components/ProductDescriptionSection';
import ProductBottomActions from './_components/ProductBottomActions';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // const isSeller = false;
  const isSeller = true;

  const productData = {
    id: Number(params.id),
    title: '스타벅스 아이스 아메리카노 쿠폰',
    price: 4500,
    currencyType: 'KRW' as const,
    tradeStatus: 'FOR_SALE' as const,
    description:
      '스타벅스 아이스 아메리카노 쿠폰입니다.\n유효기간은 2024년 12월 31일까지입니다.스타벅스 아이스 아메리카노 쿠폰입니다.\n유효기간은 2024년 12월 31일까지입니다.스타벅스 아이스 아메리카노 쿠폰입니다.\n유효기간은 2024년 12월 31일까지입니다.스타벅스 아이스 아메리카노 쿠폰입니다.\n유효기간은 2024년 12월 31일까지입니다.',
    images: [
      '/images/test_images/product_example.png',
      '/images/test_images/product_example_2.png',
      '/images/test_images/product_example.png',
      '/images/test_images/product_example_2.png',
    ],
    universityName: '서울대학교',
    regionName: '서울특별시 관악구',
    createdAt: '2024-01-15T10:30:00Z',
    likeCount: 12,
    chatRoomCount: 3,
    seller: {
      name: '판매자명',
      profileImage: null,
    },
  };

  return (
    <div className="min-h-screen bg-white pb-[84px]">
      {/* 헤더 뒤로가기 및 더보기 버튼 */}
      <ProductDetailHeader
        isSeller={isSeller}
        onEdit={() => console.log('수정하기')}
        onDelete={() => console.log('삭제하기')}
        onHide={() => console.log('글 숨기기')}
      />

      {/* 상품 이미지 스와이프 */}
      <ProductDetailImageSlider images={productData.images} />

      {/* 상품 정보(카테고리, 제목, 가격, 상태, 날짜) 및 찜하기 & 공유하기 버튼 */}

      <ProductDetailInfo {...productData} />

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

      <ProductStatusModal
        isOpen={isStatusModalOpen}
        currentStatus={productData.tradeStatus}
        onClose={() => setIsStatusModalOpen(false)}
        onStatusChange={(status) => {
          console.log('상태 변경:', status);
          setIsStatusModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProductDetailPage;
