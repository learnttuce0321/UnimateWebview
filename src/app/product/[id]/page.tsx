'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import NavigationBar from 'components/navigation/NavigationBar';
import { useMutationReportProduct } from 'hooks/products/useMutationReportProduct';
import { useQueryProductDetail } from 'hooks/products/useQueryProductDetail';
import navigationScheme from 'utils/navigationScheme';
import ProductBottomActions from './_components/ProductBottomActions';
import ProductDescriptionSection from './_components/ProductDescriptionSection';
import ProductDetailImageSlider from './_components/ProductDetailImageSlider';
import ProductDetailInfo from './_components/productDetailInfo/ProductDetailInfo';
import ProductMoreMenu from './_components/ProductMoreMenu';
import ProductSellerSection from './_components/ProductSellerSection';
import ReportBottomSheet from './_components/ReportBottomSheet';
import ReportSuccessModal from './_components/ReportSuccessModal';

export type TradeStatus = 'FOR_SALE' | 'RESERVED' | 'COMPLETED';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { mutate: reportProduct } = useMutationReportProduct();
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
          onReportClick={() => setIsReportModalOpen(true)}
        />

        {/* 고정 하단 액션 */}
        <ProductBottomActions
          isSeller={isSeller}
          onOpenChat={() => console.log('채팅하기')}
          onOpenChatList={() => console.log('채팅 목록 열기')}
          productId={productDetail.id}
          currentStatus={tradeStatus}
        />
      </div>

      <ReportBottomSheet
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={(reason, details) => {
          if (!productDetail) return;

          reportProduct(
            {
              targetUserId: productDetail.sellerId,
              reason: reason as any,
              detail: details,
            },
            {
              onSuccess: (data) => {
                setIsReportModalOpen(false);
                openModal({
                  children: (
                    <ReportSuccessModal userBlocked={data.userBlocked} />
                  ),
                  confirmText: '확인',
                  onConfirm: () => closeModal(),
                });
              },
              onError: (error) => {
                console.error('신고 실패:', error);
              },
            }
          );
        }}
      />

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
