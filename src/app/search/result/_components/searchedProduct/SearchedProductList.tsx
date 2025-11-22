'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchedProduct from 'app/search/result/_components/searchedProduct/SearchedProduct';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient from 'modules/fetch/fetchClient';
import { API_PRODUCTS_SEARCH } from 'modules/keyFactory/product';
import { normalizeString } from 'modules/normalize';
import { useAppStore } from 'providers/ZustandProvider';
import { selectPrimaryRegion } from 'stores/selectors';
import { ProductPost } from 'types/Product';
import { FilteringUniversity } from '../../page';

interface SearchedProductPostsResponse {
  contents: ProductPost[];
  hasNext: boolean;
}
interface Props {
  currentFilteringUniversity: FilteringUniversity | null;
}

const SearchResultList = ({ currentFilteringUniversity }: Props) => {
  const searchParams = useSearchParams();
  const primaryRegion = useAppStore(selectPrimaryRegion);
  const q = searchParams.get('q') ?? '';
  const universityId = currentFilteringUniversity?.id;
  const regionId = primaryRegion?.regionId;
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const currencyType = searchParams.get('currencyType') ?? '';
  const categories = searchParams.getAll('categories');
  const tradeStatus = searchParams.get('tradeStatus') ?? '';
  const sortDirection = searchParams.get('sort') ?? '';

  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: searchedProductPosts,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<SearchedProductPostsResponse>(
    infiniteTarget,
    {
      queryKey: [
        API_PRODUCTS_SEARCH,
        universityId,
        minPrice,
        maxPrice,
        currencyType,
        categories,
        tradeStatus,
        sortDirection,
      ],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<SearchedProductPostsResponse>({
            url: API_PRODUCTS_SEARCH,
            params: {
              pageNumber: pageParam,
              searchKeyword: normalizeString(q),
              regionId,
              ...(universityId && { universityId }),
              ...(minPrice && { minPrice }),
              ...(maxPrice && { maxPrice }),
              ...(currencyType && { currencyType }),
              ...(categories.length > 0 && { categories }),
              ...(tradeStatus && { tradeStatus }),
              ...(sortDirection && { sortDirection }),
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

  const searchedProductPostsList = searchedProductPosts?.pages.flatMap(
    (page) => page.contents
  );

  if (
    isLoading ||
    isError ||
    !searchedProductPostsList ||
    !searchedProductPostsList.length
  ) {
    return null;
  }

  return (
    <ul className="h-[calc(100vh-100px)] w-full overflow-y-auto overflow-x-hidden bg-gray-50 p-[16px]">
      {searchedProductPostsList.map((product) => {
        return <SearchedProduct key={product.id} product={product} />;
      })}
    </ul>
  );
};

export default SearchResultList;
