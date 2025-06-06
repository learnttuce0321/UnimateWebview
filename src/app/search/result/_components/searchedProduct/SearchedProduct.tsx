import SearchedProductImage from 'app/search/result/_components/searchedProduct/SearchedProductImage';
import SearchedProductInfo from 'app/search/result/_components/searchedProduct/SearchedProductInfo';

interface Props {
  product: any;
}

const SearchedProduct = ({ product }: Props) => {
  return (
    <a href={`/products/${product.id}`}>
      <div className="p-[16px] h-[140px] flex gap-[12px] justify-between bg-white rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] mb-[8px]">
        <SearchedProductImage imageUrl={product.imageUrl} />
        <SearchedProductInfo {...product} />
      </div>
    </a>
  );
};

export default SearchedProduct;
