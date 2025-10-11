'use client';

import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { Toast, useToast } from 'components/toast';
import { useMutationHideProduct } from 'hooks/products/useMutationHideProduct';
import { useMutationUnhideProduct } from 'hooks/products/useMutationUnhideProduct';
import { API_MY_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { ProductPost, SalesProduct, TradeStatus } from 'types/Product';
import HideSalesProductConfirmModalContent from './HideSalesProductConfirmModalContent';
import ReservedErrorModalContent from './ReservedErrorModalContent';
import UnhideSalesProductConfirmModalContent from './UnhideSalesProductConfirmModalContent';
import { useSearchParams } from 'next/navigation';
import { TradeFilterStatus } from '../../page';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';

interface Props {
  productId: number;
  isHidden: boolean;
  tradeStatus: TradeStatus;
  handlePopupClose: () => void;
}

const HideSalesProductMenu = ({
  productId,
  isHidden,
  tradeStatus,
  handlePopupClose,
}: Props) => {
  const searchParams = useSearchParams();
  const tradeFilterStatus =
    (searchParams.get('tradeFilterStatus') as TradeFilterStatus) || 'ALL';

  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { toast, showToast, hideToast } = useToast();

  const { infiniteQueryDataUpdater } = useUpdateQueryData();
  const { mutateAsync: mutateAsyncUnhideProduct } = useMutationUnhideProduct();
  const { mutateAsync: mutateAsyncHideProduct } = useMutationHideProduct();

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (tradeStatus === 'RESERVED') {
      return openModal({
        children: <ReservedErrorModalContent />,
        confirmText: '확인',
      });
    }

    if (isHidden) {
      return openModal({
        children: <UnhideSalesProductConfirmModalContent />,
        confirmText: '확인',
        onConfirm: handleUnhideProduct,
        cancelText: '취소',
      });
    } else {
      return openModal({
        children: <HideSalesProductConfirmModalContent />,
        confirmText: '확인',
        onConfirm: handleHideProduct,
        cancelText: '취소',
      });
    }
  };

  const handleHideProduct = async () => {
    await mutateAsyncHideProduct(
      { productId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<SalesProduct>(
            [API_MY_SALES_PRODUCTS, tradeFilterStatus],
            (product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  isHidden: true,
                };
              }

              return product;
            }
          );
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
        onSettled: handlePopupClose,
      }
    );
  };

  const handleUnhideProduct = async () => {
    await mutateAsyncUnhideProduct(
      { productId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<SalesProduct>(
            [API_MY_SALES_PRODUCTS, tradeFilterStatus],
            (product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  isHidden: false,
                };
              }

              return product;
            }
          );
          closeModal();
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
        onSettled: handlePopupClose,
      }
    );
  };

  return (
    <>
      <p className="flex h-[30px] w-full items-center text-blue_gray-600">
        <button
          onClick={handleMenuClick}
          className="h-full w-full px-[16px] text-left"
        >
          {isHidden ? '글 공개하기' : '글 숨기기'}
        </button>
      </p>

      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default HideSalesProductMenu;
