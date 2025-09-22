'use client';

import { useRef } from 'react';
import ProductCard from 'app/_components/product/ProductCard';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient from 'modules/fetchClient';
import { API_PRODUCT } from 'modules/keyFactory.product';
import { useAppStore } from 'providers/ZustandProvider';
import { ProductPostsResponse } from '../../../types/Product';
import { selectPrimaryRegion } from 'stores/selectors';

const ProductList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);
  const primaryRegion = useAppStore(selectPrimaryRegion);

  const {
    data: productPosts,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<ProductPostsResponse>(
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

  const productPostsList = productPosts?.pages.flatMap((page) => page.contents);

  if (isLoading || isError || !productPostsList || !productPostsList.length) {
    return null;
  }

  return (
    <main className="min-h-full_without_navigation bg-gray-50 p-[16px]">
      {productPostsList.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
      <div ref={infiniteTarget} />
    </main>
  );
};

export default ProductList;
