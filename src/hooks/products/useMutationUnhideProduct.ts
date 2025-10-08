import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_PRODUCT_UNHIDE } from 'modules/keyFactory/product';

export const useMutationUnhideProduct = () => {
  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.PATCH({
        url: API_PRODUCT_UNHIDE(productId),
      });
    },
  });
};
