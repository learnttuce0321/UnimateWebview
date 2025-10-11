import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PRODUCT_HIDE } from 'modules/keyFactory/product';

interface HideProductParams {
  productId: number;
}

export const useMutationHideProduct = () => {
  return useMutation<void, ApiResponseError, HideProductParams>({
    mutationFn: ({ productId }: HideProductParams) =>
      fetchClient.PATCH({
        url: API_PRODUCT_HIDE(productId),
      }),
  });
};
