import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchClient from 'modules/fetchClient';

export const useMutationDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number): Promise<void> => {
      await fetchClient.DELETE({
        url: `/api/v1/product-posts/${productId}`,
      });
    },
    onSuccess: (_, productId) => {
      // 상품 상세 정보 캐시 완전 제거 (삭제된 게시글이므로)
      queryClient.removeQueries({
        queryKey: ['product-detail', productId.toString()],
      });
      // 상품 목록 캐시도 무효화 (목록에서 해당 상품이 제거되어야 함)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
