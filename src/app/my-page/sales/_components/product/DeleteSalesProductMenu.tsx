'use client';

import { MouseEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ErrorModalContent from 'components/modal/ErrorModalContent';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useMutationDeleteProduct } from 'hooks/products/useMutationDeleteProduct';
import { API_MY_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { TradeStatus } from 'types/Product';
import DeleteSalesProductConfirmModalContent from './DeleteSalesProductConfirmModalContent';
import ReservedErrorModalContent from './ReservedErrorModalContent';

interface Props {
  productId: number;
  tradeStatus: TradeStatus;
}

const DeleteSalesProductMenu = ({ productId, tradeStatus }: Props) => {
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();

  const queryClient = useQueryClient();
  const { mutate } = useMutationDeleteProduct();

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
      onConfirm: () => {
        handleDeleteProduct();
      },
    });
  };

  const handleDeleteProduct = () => {
    mutate(
      { productId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [API_MY_SALES_PRODUCTS],
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
    </>
  );
};

export default DeleteSalesProductMenu;
