import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';

export interface ApiError {
  code: string;
  message: string;
}

export const useMutationHideProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.PATCH({
        url: `/api/v1/product-posts/${productId}/hide`,
      });
    },
    onSuccess: (_, productId) => {
      // 상품 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId.toString()],
      });
    },
  });
};

export const useMutationUnhideProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.PATCH({
        url: `/api/v1/product-posts/${productId}/unhide`,
      });
    },
    onSuccess: (_, productId) => {
      // 상품 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId.toString()],
      });
    },
  });
};
