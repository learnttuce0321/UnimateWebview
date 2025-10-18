'use client';

import SearchedProductImage from 'app/search/result/_components/searchedProduct/SearchedProductImage';
import SearchedProductInfo from 'app/search/result/_components/searchedProduct/SearchedProductInfo';
import { ProductPost } from 'types/Product';
import navigationScheme from 'utils/navigationScheme';

interface Props {
  product: ProductPost;
}

const SearchedProduct = ({ product }: Props) => {
  const { openWeb } = navigationScheme();
  const handleClickProduct = () => {
    openWeb(`/products/${product.id}`);
  };

  return (
    <li onClick={handleClickProduct}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <SearchedProductImage thumbnailUrl={product.thumbnailUrl} />
        <SearchedProductInfo product={product} />
      </div>
    </li>
  );
};

export default SearchedProduct;
