import { useQuery } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_PRODUCT_DETAIL } from 'modules/keyFactory/product';
import { ProductDetail } from 'types/Product';

export const useQueryProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product-detail', id],
    queryFn: async (): Promise<ProductDetail> => {
      const response = await fetchClient.GET<ProductDetail>({
        url: API_PRODUCT_DETAIL(id),
      });
      return response;
    },
    enabled: !!id,
  });
};
