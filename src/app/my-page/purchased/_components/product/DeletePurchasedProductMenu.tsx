'use client';

import { MouseEvent } from 'react';
import { ErrorModalData } from 'components/modal/useModal';
import { ToastType } from 'components/toast';
import { useMutationDeletePurchasedProduct } from 'hooks/products/useMutationDeletePurchasedProduct';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_MY_PURCHASED_PRODUCTS } from 'modules/keyFactory/product';
import { PurchasedProduct } from 'types/Product';
import DeletePurchasedProductConfirmModalContent from './DeletePurchasedProductConfirmModalContent';

interface Props {
  purchaseHistoryId: number;
  closePopup: () => void;
  openModal: (data: ErrorModalData) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const DeletePurchasedProductMenu = ({
  purchaseHistoryId,
  closePopup,
  openModal,
  showToast,
}: Props) => {
  const { infiniteQueryDataUpdater } = useUpdateQueryData();
  const { mutateAsync } = useMutationDeletePurchasedProduct();

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    return openModal({
      children: <DeletePurchasedProductConfirmModalContent />,
      confirmText: '확인',
      onConfirm: handleDeletePurchasedProduct,
      cancelText: '취소',
    });
  };

  const handleDeletePurchasedProduct = async () => {
    await mutateAsync(
      { purchaseHistoryId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<PurchasedProduct>(
            [API_MY_PURCHASED_PRODUCTS],
            (product) => {
              if (product.purchaseHistoryId === purchaseHistoryId) {
                return null;
              }

              return product;
            }
          );
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
        onSettled: closePopup,
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
          목록에서 지우기
        </button>
      </p>
    </>
  );
};

export default DeletePurchasedProductMenu;
