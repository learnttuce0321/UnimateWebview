'use client';

import NavigationBar from 'components/navigation/NavigationBar';
import MateProfile from './_components/MateProfile';
import { useQuery } from '@tanstack/react-query';
import { API_USER_PROFILE } from 'modules/keyFactory/user';
import { useParams } from 'next/navigation';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { MateUser } from 'types/User';
import { API_USER_SALES_PRODUCTS } from 'modules/keyFactory/product';
import { ProductPost } from 'types/Product';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import { useRef } from 'react';
import MateProfileError from './_components/MateProfileError';

interface MateSalesProductPostListsResponse {
  contents: ProductPost[];
  hasNext: boolean;
}

const Page = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const params = useParams();
  const userId = params.userId as string;

  const {
    data: mateProfileData,
    isLoading: isMateProfileQueryLoading,
    isError: isMateProfileQueryError,
    error: mateProfileError,
  } = useQuery<MateUser, ApiResponseError>({
    queryKey: [API_USER_PROFILE(userId)],
    enabled: !!userId,
  });

  const {
    data: mateSalesProductPosts,
    isLoading: isMateSalesProductPostsLoading,
    isError: isMateSalesProductPostsError,
    error: mateSalesProductPostsError,
  } = useInfiniteQueryWithObserver<
    MateSalesProductPostListsResponse,
    ApiResponseError
  >(
    infiniteTarget,
    {
      queryKey: [API_USER_SALES_PRODUCTS(userId)],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<MateSalesProductPostListsResponse>({
            url: API_USER_SALES_PRODUCTS(userId),
            params: {
              pageNumber: pageParam,
            },
          });

          return res;
        } catch (error) {
          console.log('search interest region', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return allPages.length + 1;
        }
        return null;
      },
      enabled: !!userId,
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const mateSalesProductList = mateSalesProductPosts?.pages.flatMap(
    (page) => page.contents
  );

  const isLoading =
    isMateProfileQueryLoading ||
    !mateProfileData ||
    isMateSalesProductPostsLoading ||
    !mateSalesProductList ||
    !mateSalesProductList.length;

  if (isLoading) {
    return null;
  }

  if (isMateProfileQueryError) {
    return <MateProfileError error={mateProfileError} />;
  }

  if (isMateSalesProductPostsError) {
    return <MateProfileError error={mateSalesProductPostsError} />;
  }

  return (
    <>
      <NavigationBar title="프로필 설정" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        {!isLoading && (
          <>
            <MateProfile mateProfile={mateProfileData} />
            <div ref={infiniteTarget} />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
