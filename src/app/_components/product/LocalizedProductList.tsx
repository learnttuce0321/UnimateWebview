'use client';

import { useRef } from 'react';
import LocalizedProduct from 'app/_components/product/LocalizedProduct';
import { MAIN_PAGE_UPDATE_PRODUCTS_LIKE } from 'constants/storageSyncKeyFactory/main';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import { useStorageSync } from 'hooks/useStorageSync';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PRODUCT } from 'modules/keyFactory/product';
import { useAppStore } from 'providers/ZustandProvider';
import { selectPrimaryRegion } from 'stores/selectors';
import { ProductPost } from 'types/Product';
import LocalizedProductListError from './LocalizedProductListError';

interface ProductPostsResponse {
  contents: ProductPost[];
  hasNext: boolean;
}

const LocalizedProductList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);
  const primaryRegion = useAppStore(selectPrimaryRegion);

  const { infiniteQueryDataUpdater } = useUpdateQueryData();

  const {
    data: productPosts,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<ProductPostsResponse, ApiResponseError>(
    infiniteTarget,
    {
      queryKey: [API_PRODUCT, primaryRegion?.regionId],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<ProductPostsResponse>({
            url: API_PRODUCT,
            params: {
              pageNumber: pageParam,
              regionId: primaryRegion?.regionId ?? '',
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

  useStorageSync(MAIN_PAGE_UPDATE_PRODUCTS_LIKE, (newValue) => {
    const { productId, updateType } = newValue;

    infiniteQueryDataUpdater<ProductPost>(
      [API_PRODUCT, primaryRegion?.regionId],
      (product) =>
        product.id === productId
          ? {
              ...product,
              ...(updateType === 'like' && {
                isLiked: true,
                likeCount: product.likeCount + 1,
              }),
              ...(updateType === 'unlike' && {
                isLiked: false,
                likeCount: product.likeCount - 1,
              }),
            }
          : product
    );
  });

  const productPostsList = productPosts?.pages.flatMap((page) => page.contents);

  if (isError) {
    return <LocalizedProductListError error={error} />;
  }

  if (isLoading || !productPostsList || !productPostsList.length) {
    return null;
  }

  return (
    <main className="min-h-full_without_navigation bg-gray-50 p-[16px]">
      <ul>
        {productPostsList.map((product) => {
          return <LocalizedProduct product={product} key={product.id} />;
        })}
      </ul>
      <div ref={infiniteTarget} />
    </main>
  );
};

export default LocalizedProductList;
