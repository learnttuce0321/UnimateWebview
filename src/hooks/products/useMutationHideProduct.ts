import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_PRODUCT_HIDE } from 'modules/keyFactory/product';

export interface ApiError {
  code: string;
  message: string;
}

export const useMutationHideProduct = () => {
  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.PATCH({
        url: API_PRODUCT_HIDE(productId),
      });
    },
  });
};
