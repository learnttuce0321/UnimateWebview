import { useRef } from 'react';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient from 'modules/fetch/fetchClient';
import { API_MY_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { SalesProduct as TSalesProduct, TradeStatus } from 'types/Product';
import SalesProduct from './SalesProduct';

interface Props {
  tradeStatus: TradeStatus;
}

interface SalesProductPostsResponse {
  contents: TSalesProduct[];
  hasNext: boolean;
}

const SalesList = ({ tradeStatus }: Props) => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: salesProductPosts,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<SalesProductPostsResponse>(
    infiniteTarget,
    {
      queryKey: [API_MY_SALES_PRODUCTS, tradeStatus],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<SalesProductPostsResponse>({
            url: API_MY_SALES_PRODUCTS,
            params: {
              pageNumber: pageParam,
              ...(tradeStatus &&
                tradeStatus !== 'ALL' && { mySalesFilter: tradeStatus }),
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

  if (
    isLoading ||
    isError ||
    !salesProductPostsList ||
    !salesProductPostsList.length
  ) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-[10px] px-[16px]">
      {salesProductPostsList.map((product) => {
        return <SalesProduct key={product.id} product={product} />;
      })}
      <div ref={infiniteTarget} />
    </ul>
  );
};

export default SalesList;
