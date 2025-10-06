import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';

export const useMutationLikeProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.POST({
        url: `/api/v1/product-posts/${productId}/like`,
      });
    },
    onSuccess: (_, productId) => {
      // 상품 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId.toString()],
      });
      // 상품 목록 캐시도 무효화 (찜 수가 변경되어야 함)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};

export const useMutationUnlikeProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.DELETE({
        url: `/api/v1/product-posts/${productId}/like`,
      });
    },
    onSuccess: (_, productId) => {
      // 상품 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId.toString()],
      });
      // 상품 목록 캐시도 무효화 (찜 수가 변경되어야 함)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
