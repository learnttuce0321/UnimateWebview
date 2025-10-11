'use client';

import { useState } from 'react';
import { Toast, useToast } from 'components/toast';
import { useMutationLikeProduct } from 'hooks/products/useMutationLikeProduct';
import { useMutationUnlikeProduct } from 'hooks/products/useMutationUnlikeProduct';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_MY_LIKE_PRODUCTS, API_PRODUCT } from 'modules/keyFactory/product';
import { useAppStore } from 'providers/ZustandProvider';
import { selectPrimaryRegion } from 'stores/selectors';
import { LikeProduct, ProductPost } from 'types/Product';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { MAIN_PAGE_UPDATE_PRODUCTS_LIKE } from 'constants/storageSyncKeyFactory/main';
interface Props {
  productId: number;
  isLiked: boolean;
}

const LikedProductLikeButton = ({ productId, isLiked }: Props) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { toast, showToast, hideToast } = useToast();

  const primaryRegion = useAppStore(selectPrimaryRegion);

  const { infiniteQueryDataUpdater } = useUpdateQueryData();
  const { mutate: mutateLikeProduct } = useMutationLikeProduct();
  const { mutate: mutateUnlikeProduct } = useMutationUnlikeProduct();

  const handleLikeButtonClick = () => {
    if (isDisabled) {
      return;
    }

    setIsDisabled(true);

    if (isLiked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };

  const handleLike = () => {
    mutateLikeProduct(
      { productId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<LikeProduct>(
            [API_MY_LIKE_PRODUCTS],
            (product) =>
              product.id === productId ? { ...product, isLiked: true } : product
          );
          setLocalStorageAndSync(MAIN_PAGE_UPDATE_PRODUCTS_LIKE, {
            productId,
            updateType: 'like',
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
        onSettled: () => {
          setIsDisabled(false);
        },
      }
    );
  };

  const handleUnlike = () => {
    mutateUnlikeProduct(
      { productId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<LikeProduct>(
            [API_MY_LIKE_PRODUCTS],
            (product) =>
              product.id === productId
                ? { ...product, isLiked: false }
                : product
          );
          setLocalStorageAndSync(MAIN_PAGE_UPDATE_PRODUCTS_LIKE, {
            productId,
            updateType: 'unlike',
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
        onSettled: () => {
          setIsDisabled(false);
        },
      }
    );
  };

  return (
    <>
      <div onClick={handleLikeButtonClick}>
        {isLiked ? (
          <img
            src="/images/svg/my-page/icon-toggle-favorite-on.svg"
            alt="좋아요"
            width={24}
            height={24}
          />
        ) : (
          <img
            src="/images/svg/my-page/icon-toggle-favorite-off.svg"
            alt=""
            width={24}
            height={24}
          />
        )}
      </div>
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

export default LikedProductLikeButton;
