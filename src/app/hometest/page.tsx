import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ProductPostsResponse } from 'app/register/_type/registerType';
import { API_PRODUCTS_LIST } from 'modules/keyFactory';
import { createSSRQueryClient } from 'modules/queryClient.server';
import ProductPostList from './_components/ProductPostsList';

// fetchClient.ts 의 cache:'no-store' 옵션 때문에 빌드 에러가 발생해서 임시로 동적으로 페이지 생성
export const dynamic = 'force-dynamic';

export default async function TestHomePage() {
  const { queryClient, fetchQuery } = createSSRQueryClient();

  await fetchQuery<ProductPostsResponse>({
    url: API_PRODUCTS_LIST,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductPostList />
    </HydrationBoundary>
  );
}
