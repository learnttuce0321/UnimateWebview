import { useQuery } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_PRODUCT_TRADE_PROGRESS } from 'modules/keyFactory/product';
import { TradeProgressResponse } from 'types/Product';

export const useQueryProductTradeProgress = (productId: string | number) => {
  return useQuery({
    queryKey: ['product-trade-progress', productId],
    queryFn: async (): Promise<TradeProgressResponse> => {
      const response = await fetchClient.GET<TradeProgressResponse>({
        url: API_PRODUCT_TRADE_PROGRESS(productId),
      });
      return response;
    },
    enabled: false,
  });
};
