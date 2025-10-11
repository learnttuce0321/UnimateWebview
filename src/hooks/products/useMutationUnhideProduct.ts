import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PRODUCT_UNHIDE } from 'modules/keyFactory/product';

interface UnhideProductParams {
  productId: number;
}

export const useMutationUnhideProduct = () => {
  return useMutation<void, ApiResponseError, UnhideProductParams>({
    mutationFn: ({ productId }: UnhideProductParams) =>
      fetchClient.PATCH({
        url: API_PRODUCT_UNHIDE(productId),
      }),
  });
};
