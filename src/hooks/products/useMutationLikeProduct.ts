import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PRODUCT_LIKE } from 'modules/keyFactory/product';

interface ProductLikeParams {
  productId: number;
}

export const useMutationLikeProduct = () => {
  return useMutation<void, ApiResponseError, ProductLikeParams>({
    mutationFn: async ({ productId }): Promise<void> => {
      await fetchClient.POST({
        url: API_PRODUCT_LIKE(productId),
      });
    },
  });
};
