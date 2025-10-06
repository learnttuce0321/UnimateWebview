import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerApi } from 'app/register/_api/registerApi';
import { ProductPostCreateRequest } from 'app/register/_type/registerType';

export const useMutationUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      requestData,
    }: {
      productId: number;
      requestData: ProductPostCreateRequest;
    }): Promise<void> => {
      await registerApi.updateProductPost(productId, requestData);
    },
    onSuccess: (_, { productId }) => {
      // 수정된 상품의 상세 정보 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['product-detail', productId.toString()],
      });
      // 상품 목록 캐시도 무효화 (수정된 정보 반영)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};
