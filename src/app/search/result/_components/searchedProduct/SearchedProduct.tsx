'use client';

import SearchedProductImage from 'app/search/result/_components/searchedProduct/SearchedProductImage';
import SearchedProductInfo from 'app/search/result/_components/searchedProduct/SearchedProductInfo';
import { useRouter } from 'next/navigation';

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
      <div className="p-[16px] h-[140px] flex gap-[12px] justify-between bg-white rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] mb-[8px]">
        <SearchedProductImage imageUrl={product.imageUrl} />
        <SearchedProductInfo {...product} />
      </div>
    </li>
  );
};

export default SearchedProduct;
