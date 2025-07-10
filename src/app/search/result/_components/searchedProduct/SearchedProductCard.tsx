import ProductImage from 'app/_components/product/ProductImage';
import ProductInfo from 'app/_components/product/ProductInfo';

interface Props {
  product: any;
}

const SearchedProductCard = ({ product }: Props) => {
  return (
    <a href={`/products/${product.id}`}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <ProductImage imageUrl={product.imageUrl} />
        <ProductInfo {...product} />
      </div>
    </a>
  );
};

export default SearchedProductCard;
