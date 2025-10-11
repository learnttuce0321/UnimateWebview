'use client';

import { useRef } from 'react';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_MY_LIKE_PRODUCTS } from 'modules/keyFactory/product';
import { LikeProduct } from 'types/Product';
import LikedProduct from './LikedProduct';
import LikedProductListError from './LikedProductListError';

interface LikedProductPostListResponse {
  contents: LikeProduct[];
  hasNext: boolean;
}

const LikedProductList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: likedProductPosts,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<
    LikedProductPostListResponse,
    ApiResponseError
  >(
    infiniteTarget,
    {
      queryKey: [API_MY_LIKE_PRODUCTS],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<LikedProductPostListResponse>({
            url: API_MY_LIKE_PRODUCTS,
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

  const likedProductList =
    likedProductPosts?.pages.flatMap((page) => page.contents) ?? [];

  if (isError) {
    return <LikedProductListError error={error} />;
  }

  if (isLoading || !likedProductList || !likedProductList.length) {
    return null;
  }

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {likedProductList.map((product) => {
          return <LikedProduct key={product.id} product={product} />;
        })}
      </ul>
      <div ref={infiniteTarget} />
    </>
  );
};

export default LikedProductList;
