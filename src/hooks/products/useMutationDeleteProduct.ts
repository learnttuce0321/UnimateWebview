import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PRODUCT_DELETE } from 'modules/keyFactory/product';

interface DeleteProductParams {
  productId: number;
}

export const useMutationDeleteProduct = () => {
  return useMutation<void, ApiResponseError, DeleteProductParams>({
    mutationFn: ({ productId }: DeleteProductParams) => {
      return fetchClient.DELETE({
        url: API_PRODUCT_DELETE(productId),
      });
    },
  });
};
