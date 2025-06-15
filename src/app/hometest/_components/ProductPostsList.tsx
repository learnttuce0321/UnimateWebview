'use client';

import { useQuery } from '@tanstack/react-query';
import { ProductPostsResponse } from 'app/register/_type/registerType';
import { API_PRODUCTS_LIST } from 'modules/keyFactory';

export default function ProductPostList() {
  const { data: productPosts } = useQuery<ProductPostsResponse>({
    queryKey: [API_PRODUCTS_LIST],
  });

  if (!productPosts) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <ul className="flex flex-col gap-2">
        {productPosts.content.map((productItem) => (
          <li key={productItem.id}>{productItem.title}</li>
        ))}
      </ul>
    </div>
  );
}
