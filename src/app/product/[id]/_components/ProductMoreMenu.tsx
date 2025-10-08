'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ErrorModalContent from 'components/modal/ErrorModalContent';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useMutationDeleteProduct } from 'hooks/products/useMutationDeleteProduct';
import { useMutationHideProduct } from 'hooks/products/useMutationHideProduct';
import { useMutationUnhideProduct } from 'hooks/products/useMutationUnhideProduct';
import navigationScheme from 'utils/navigationScheme';
import { TradeStatus } from '../page';
import DeleteProductConfirmModalContent from './productDetailInfo/DeleteProductConfirmModalContent';
import DeleteReservedProductErrorModalContent from './productDetailInfo/DeleteReservedProductErrorModalContent';
import HideProductConfirmModalContent from './productDetailInfo/HideProductConfirmModalContent';
import HideReservedProductErrorModalContent from './productDetailInfo/HideReservedProductErrorModalContent';
import UnhideProductConfirmModalContent from './productDetailInfo/UnhideProductConfirmModalContent';

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
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();

  const { closeWeb } = navigationScheme();

  const queryClient = useQueryClient();
  const { mutate: mutateHideProduct } = useMutationHideProduct();
  const { mutate: mutateUnhideProduct } = useMutationUnhideProduct();
  const { mutate: mutateDeleteProduct } = useMutationDeleteProduct();

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

  const handleHideClick = () => {
    if (tradeStatus === 'RESERVED') {
      return openModal({
        children: <HideReservedProductErrorModalContent />,
        confirmText: '확인',
      });
    }

    if (isHidden) {
      return openModal({
        children: <UnhideProductConfirmModalContent />,
        confirmText: '확인',
        onConfirm: () => {
          handleUnhideProduct();
        },
        cancelText: '취소',
      });
    } else {
      return openModal({
        children: <HideProductConfirmModalContent />,
        confirmText: '확인',
        onConfirm: () => {
          handleHideProduct();
        },
        cancelText: '취소',
      });
    }
  };

  const handleUnhideProduct = async () => {
    mutateUnhideProduct(
      { productId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['product-detail', productId.toString()],
          });
        },
        onError: (error) => {
          openModal({
            children: (
              <ErrorModalContent
                errorMessage={error.message || '오류가 발생했습니다.'}
              />
            ),
          });
        },
      }
    );
  };

  const handleHideProduct = async () => {
    mutateHideProduct(
      { productId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['product-detail', productId.toString()],
          });
        },
        onError: (error) => {
          openModal({
            children: (
              <ErrorModalContent
                errorMessage={error.message || '오류가 발생했습니다.'}
              />
            ),
          });
        },
      }
    );
  };

  const handleDeleteClick = () => {
    if (tradeStatus === 'RESERVED') {
      return openModal({
        children: <DeleteReservedProductErrorModalContent />,
        confirmText: '확인',
      });
    }

    return openModal({
      children: <DeleteProductConfirmModalContent />,
      confirmText: '확인',
      onConfirm: () => {
        handleProductDelete();
      },
      cancelText: '취소',
    });
  };

  const handleProductDelete = async () => {
    mutateDeleteProduct(
      { productId },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ['products'],
          });
          closeWeb();
        },
        onError: (error) => {
          openModal({
            children: (
              <ErrorModalContent
                errorMessage={error.message || '오류가 발생했습니다.'}
              />
            ),
          });
        },
      }
    );
  };

  return (
    <>
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
                  handleHideClick();
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
                  handleDeleteClick();
                }}
                className="block h-[30px] w-24 text-left"
                role="menuitem"
              >
                삭제하기
              </button>
            </div>
          </>
        )}
      </div>
      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
}
