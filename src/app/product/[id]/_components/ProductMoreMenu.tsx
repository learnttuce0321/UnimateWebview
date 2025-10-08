'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Modal from 'components/modal/Modal';
import { useMutationDeleteProduct } from 'hooks/products/useMutationDeleteProduct';
import { useMutationHideProduct } from 'hooks/products/useMutationHideProduct';
import { useMutationUnhideProduct } from 'hooks/products/useMutationUnhideProduct';
import { TradeStatus } from '../page';

type Props = {
  productId: number;
  tradeStatus: TradeStatus;
  isHidden?: boolean;
  onEdit?: () => void;
};

export default function ProductMoreMenu({
  productId,
  tradeStatus,
  isHidden = false,
  onEdit,
}: Props) {
  const [open, setOpen] = useState(false);
  const [showReservedAlertModal, setShowReservedAlertModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [actionType, setActionType] = useState<'hide' | 'delete' | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();
  const hideMutation = useMutationHideProduct();
  const unhideMutation = useMutationUnhideProduct();
  const deleteMutation = useMutationDeleteProduct();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // iOS 웹뷰: 바깥 탭으로 닫기 + 스크롤 락
  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);

    // 바깥 탭 감지 (iOS는 touchstart 우선)
    const onTouchStart = (e: TouchEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) close();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) close();
    };

    // 앱 백그라운드/다른 화면 전환 시 닫기
    const onHidden = () => {
      if (document.hidden) close();
    };

    // 바디 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onHidden);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onHidden);
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [open]);

  const handleHideOrDelete = (type: 'hide' | 'delete') => {
    setActionType(type);

    if (type === 'hide' && tradeStatus === 'RESERVED') {
      setShowReservedAlertModal(true);
    } else if (type === 'delete' && tradeStatus === 'RESERVED') {
      setShowReservedAlertModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmAction = () => {
    setShowConfirmModal(false);

    if (actionType === 'hide') {
      if (isHidden) {
        unhideMutation.mutate(productId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['product-detail', productId.toString()],
            });
          },
          onError: (error) => {
            setErrorMessage(error.message || '오류가 발생했습니다.');
            setShowErrorModal(true);
          },
        });
      } else {
        hideMutation.mutate(productId, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['product-detail', productId.toString()],
            });
          },
          onError: (error) => {
            setErrorMessage(error.message || '오류가 발생했습니다.');
            setShowErrorModal(true);
          },
        });
      }
    } else if (actionType === 'delete') {
      deleteMutation.mutate(productId, {
        onSuccess: async () => {
          queryClient.removeQueries({
            queryKey: ['product-detail', productId.toString()],
          });
          // 상품 목록 캐시도 무효화 (목록에서 해당 상품이 제거되어야 함)
          await queryClient.invalidateQueries({
            queryKey: ['products'],
          });
          router.push('/');
        },
        onError: (error) => {
          setErrorMessage(error.message || '오류가 발생했습니다.');
          setShowErrorModal(true);
        },
      });
    }

    setActionType(null);
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setActionType(null);
  };

  const handleCloseReservedAlert = () => {
    setShowReservedAlertModal(false);
    setActionType(null);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onContextMenu={(e) => e.preventDefault()} // iOS 롱프레스 방지
        className="flex h-6 w-6 items-center justify-center [-webkit-tap-highlight-color:transparent]"
      >
        <img
          src="/images/svg/product/icon-system-more-vertical.svg"
          alt="더보기"
        />
      </button>

      {/* 팝오버 */}
      {open && (
        <>
          {/* 오버레이: 바깥 탭 감지용 (div 사용) */}
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onTouchStart={() => setOpen(false)}
          />

          <div
            ref={menuRef}
            role="menu"
            className="absolute right-0 top-7 z-50 flex h-auto w-auto flex-col overflow-hidden rounded-[10px] border bg-white px-4 py-2 text-[14px] font-normal leading-[14px] text-[#7a8086] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* 비활성 항목 */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleHideOrDelete('hide');
              }}
              className="block h-[30px] w-24 text-left"
              role="menuitem"
            >
              {isHidden ? '글 숨김해제' : '글 숨기기'}
            </button>

            <button
              type="button"
              onClick={() => {
                onEdit?.();
                setOpen(false);
              }}
              className="block h-[30px] w-24 text-left"
              role="menuitem"
            >
              수정하기
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                handleHideOrDelete('delete');
              }}
              className="block h-[30px] w-24 text-left"
              role="menuitem"
            >
              삭제하기
            </button>
          </div>
        </>
      )}

      {/* 예약중 상태 알림 모달 */}
      <Modal
        isOpened={showReservedAlertModal}
        confirmText="확인"
        onConfirm={handleCloseReservedAlert}
        onOverlayClick={handleCloseReservedAlert}
      >
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
            {`예약중인 글은 ${actionType === 'hide' ? '숨길' : '삭제할 '} 수 없어요.`}
          </p>
          <p className="text-[14px] font-medium leading-[16.8px] text-[#666b72]">
            판매상태를 변경한 후 다시 시도해주세요.
          </p>
        </div>
      </Modal>

      {/* 확인 모달 */}
      <Modal
        isOpened={showConfirmModal}
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        onOverlayClick={handleCancelAction}
      >
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
            이 글을{' '}
            {actionType === 'hide'
              ? isHidden
                ? '숨김해제 하'
                : '숨기'
              : '삭제하'}
            시겠어요?
          </p>
          <p className="whitespace-pre-line break-keep text-[14px] font-medium leading-[16.8px] text-[#666b72]">
            {actionType === 'hide'
              ? '숨김처리 된 글은 다른 메이트에게 \n비공개처리 됩니다.'
              : '삭제한 글은 다시 복구할 수 없어요.'}
          </p>
        </div>
      </Modal>

      {/* 에러 모달 */}
      <Modal
        isOpened={showErrorModal}
        confirmText="확인"
        onConfirm={handleCloseErrorModal}
        onOverlayClick={handleCloseErrorModal}
      >
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
            오류가 발생했습니다
          </p>
          <p className="text-[14px] font-medium leading-[16.8px] text-[#666b72]">
            {errorMessage}
          </p>
        </div>
      </Modal>
    </div>
  );
}
