import { useQuery } from '@tanstack/react-query';
import fetchClient from 'modules/fetchClient';
import { ProductDetail } from 'types/Product';

export const useQueryProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product-detail', id],
    queryFn: async (): Promise<ProductDetail> => {
      const response = await fetchClient.GET<ProductDetail>({
        url: `/api/v1/product-posts/${id}`,
      });
      return response;
    },
    enabled: !!id,
  });
};
