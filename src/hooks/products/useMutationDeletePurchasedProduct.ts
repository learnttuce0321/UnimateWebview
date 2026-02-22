import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PURCHASED_PRODUCT_DELETE } from 'modules/keyFactory/product';

interface DeleteProductParams {
  purchaseHistoryId: number;
}

export const useMutationDeletePurchasedProduct = () => {
  return useMutation<void, ApiResponseError, DeleteProductParams>({
    mutationFn: ({ purchaseHistoryId }: DeleteProductParams) => {
      return fetchClient.DELETE({
        url: API_PURCHASED_PRODUCT_DELETE(purchaseHistoryId),
      });
    },
  });
};
