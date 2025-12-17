'use client';

import { useRef } from 'react';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_MY_PURCHASED_PRODUCTS } from 'modules/keyFactory/product';
import { PurchasedProduct as TPurchasedProduct } from 'types/Product';
import PurchasedProduct from './PurchasedProduct';
import PurchasedProductListError from './PurchasedProductListError';
import ScreenLoading from 'components/loading/ScreenLoading';

interface PurchasedProductPostListResponse {
  contents: TPurchasedProduct[];
  hasNext: boolean;
}

const PurchasedProductList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: purchasedProductPosts,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<
    PurchasedProductPostListResponse,
    ApiResponseError
  >(
    infiniteTarget,
    {
      queryKey: [API_MY_PURCHASED_PRODUCTS],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<PurchasedProductPostListResponse>({
            url: API_MY_PURCHASED_PRODUCTS,
            params: {
              pageNumber: pageParam,
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

  const purchasedProductList =
    purchasedProductPosts?.pages.flatMap((page) => page.contents) ?? [];

  if (isError) {
    return <PurchasedProductListError error={error} />;
  }

  if (isLoading) {
    return <ScreenLoading />;
  }

  if (isLoading || !purchasedProductList || !purchasedProductList.length) {
    return null;
  }

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {purchasedProductList.map((product) => {
          return (
            <PurchasedProduct
              key={product.purchaseHistoryId}
              product={product}
            />
          );
        })}
      </ul>
      <div ref={infiniteTarget} />
    </>
  );
};

export default PurchasedProductList;
