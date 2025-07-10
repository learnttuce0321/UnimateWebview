'use client';

import { useRouter } from 'next/navigation';
import SearchedProductImage from 'app/search/result/_components/searchedProduct/SearchedProductImage';
import SearchedProductInfo from 'app/search/result/_components/searchedProduct/SearchedProductInfo';

interface Props {
  product: any;
}

const SearchedProduct = ({ product }: Props) => {
  const router = useRouter();
  const handleClickProduct = () => {
    router.push(`/products/${product.id}`);
  };
  return (
    <li onClick={handleClickProduct}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <SearchedProductImage imageUrl={product.imageUrl} />
        <SearchedProductInfo {...product} />
      </div>
    </li>
  );
};

export default SearchedProduct;
