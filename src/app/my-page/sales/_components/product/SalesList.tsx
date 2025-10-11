'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_MY_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { SalesProduct as TSalesProduct } from 'types/Product';
import SalesProduct from './SalesProduct';
import SalesProductListError from './SalesProductListError';
import { TradeFilterStatus } from '../../page';

interface SalesProductPostsResponse {
  contents: TSalesProduct[];
  hasNext: boolean;
}

const SalesList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const tradeFilterStatus =
    (searchParams.get('tradeFilterStatus') as TradeFilterStatus) || 'ALL';

  const {
    data: salesProductPosts,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<SalesProductPostsResponse, ApiResponseError>(
    infiniteTarget,
    {
      queryKey: [API_MY_SALES_PRODUCTS, tradeFilterStatus],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<SalesProductPostsResponse>({
            url: API_MY_SALES_PRODUCTS,
            params: {
              pageNumber: pageParam,
              ...(tradeFilterStatus &&
                tradeFilterStatus !== 'ALL' && {
                  mySalesFilter: tradeFilterStatus,
                }),
            },
          });

          return res;
        } catch (error) {
          console.log('region product list', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return allPages.length + 1;
        }
        return null;
      },
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const salesProductPostsList = salesProductPosts?.pages.flatMap(
    (page) => page.contents
  );

  if (isError) {
    return <SalesProductListError error={error} />;
  }
  if (isLoading || !salesProductPostsList || !salesProductPostsList.length) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-[10px] px-[16px]">
      {salesProductPostsList.map((product) => {
        if (!product) {
          return null;
        }

        return <SalesProduct key={product.id} product={product} />;
      })}
      <div ref={infiniteTarget} />
    </ul>
  );
};

export default SalesList;
