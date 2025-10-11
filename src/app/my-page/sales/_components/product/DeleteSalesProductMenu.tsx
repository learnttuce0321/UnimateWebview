'use client';

import { MouseEvent } from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useMutationDeleteProduct } from 'hooks/products/useMutationDeleteProduct';
import { API_MY_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { ProductPost, TradeStatus } from 'types/Product';
import DeleteSalesProductConfirmModalContent from './DeleteSalesProductConfirmModalContent';
import ReservedErrorModalContent from './ReservedErrorModalContent';
import { Toast, useToast } from 'components/toast';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { useSearchParams } from 'next/navigation';
import { TradeFilterStatus } from '../../page';

interface Props {
  productId: number;
  tradeStatus: TradeStatus;
  handlePopupClose: () => void;
}

const DeleteSalesProductMenu = ({
  productId,
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
  const { mutateAsync } = useMutationDeleteProduct();

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (tradeStatus === 'RESERVED') {
      return openModal({
        children: <ReservedErrorModalContent />,
        confirmText: '확인',
      });
    }

    return openModal({
      children: <DeleteSalesProductConfirmModalContent />,
      confirmText: '확인',
      onConfirm: handleDeleteProduct,
      cancelText: '취소',
    });
  };

  const handleDeleteProduct = async () => {
    await mutateAsync(
      { productId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<ProductPost>(
            [API_MY_SALES_PRODUCTS, tradeFilterStatus],
            (product) => {
              if (product.id === productId) {
                return null;
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

  return (
    <>
      <p className="flex h-[30px] w-full items-center text-blue_gray-600">
        <button
          onClick={handleMenuClick}
          className="h-full w-full px-[16px] text-left"
        >
          삭제하기
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

export default DeleteSalesProductMenu;
