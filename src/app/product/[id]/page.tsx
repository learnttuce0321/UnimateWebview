'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useQueryProductDetail } from 'hooks/products/useQueryProductDetail';
import navigationScheme from 'utils/navigationScheme';
import ProductBottomActions from './_components/ProductBottomActions';
import ProductDescriptionSection from './_components/ProductDescriptionSection';
import ProductDetailImageSlider from './_components/ProductDetailImageSlider';
import ProductDetailInfo from './_components/productDetailInfo/ProductDetailInfo';
import ProductSellerSection from './_components/ProductSellerSection';
import ProductStatusBottomSheet from './_components/ProductStatusBottomSheet';
import ReportModalContent from './_components/ReportModalContent';
import NavigationBar from 'components/navigation/NavigationBar';
import ProductMoreMenu from './_components/ProductMoreMenu';

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'SOLD_OUT';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const [tradeStatus, setTradeStatus] = useState<TradeStatus>('FOR_SALE');
  const { openWeb } = navigationScheme();

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
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !productDetail) {
    return (
      <div className="flex items-center justify-center h-screen">
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
    <>
      <div className="min-h-screen bg-white pb-[84px]">
        {/* 헤더 뒤로가기 및 더보기 버튼 */}
        <NavigationBar
          title={''}
          renderOptionButtons={
            isSeller ? (
              <ProductMoreMenu
                productId={productDetail.id}
                tradeStatus={tradeStatus}
                isHidden={productDetail.isHidden}
                onEdit={() => {
                  // 수정 모드로 등록 페이지 이동
                  openWeb(`/register?productId=${productDetail.id}`);
                }}
              />
            ) : null
          }
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
          onReportClick={() =>
            openModal({
              children: (
                <ReportModalContent
                  selectedReason={selectedReason}
                  setSelectedReason={setSelectedReason}
                  otherReason={otherReason}
                  setOtherReason={setOtherReason}
                />
              ),
              confirmText: '신고하기',
              cancelText: '취소',
              onConfirm: () => {
                console.log('여기다가 신고하기 제출 로직 추가하기');
              },
            })
          }
        />

        {/* 고정 하단 액션 */}
        <ProductBottomActions
          isSeller={isSeller}
          onOpenChat={() => console.log('채팅하기')}
          onOpenChatList={() => console.log('채팅 목록 열기')}
          onOpenStatus={() => setIsStatusModalOpen(true)}
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

      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
};

export default ProductDetailPage;
