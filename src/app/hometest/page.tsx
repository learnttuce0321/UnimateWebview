import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ProductPostsResponse } from 'app/register/_type/registerType';
import { createSSRQueryClient } from 'modules/queryClient.server';
import ProductPostList from './_components/ProductPostsList';
import { API_PRODUCTS_LIST } from 'modules/keyFactory';

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
