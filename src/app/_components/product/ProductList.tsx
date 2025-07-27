'use client';

import { useRef } from 'react';
import ProductCard from 'app/_components/product/ProductCard';
import { ProductPostsResponse } from 'app/register/_type/registerType';
import { useInfiniteQueryWithObserver } from 'hooks/useInifiniteQueryWithObserver';
import fetchClient from 'modules/fetchClient';
import { API_PRODUCTS_LIST } from 'modules/keyFactory';

interface Props {
  regionId: string;
}

const ProductList = ({ regionId }: Props) => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: productPosts,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<ProductPostsResponse>(
    infiniteTarget,
    {
      queryKey: [API_PRODUCTS_LIST],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<ProductPostsResponse>({
            url: API_PRODUCTS_LIST,
            params: {
              pageNumber: pageParam,
              regionId,
            },
          });

          return res;
        } catch (error) {
          console.log('membership detail error', error);
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
