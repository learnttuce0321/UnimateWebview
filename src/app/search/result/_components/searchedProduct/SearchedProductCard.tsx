import ProductImage from 'app/_components/product/ProductImage';
import ProductInfo from 'app/_components/product/ProductInfo';

interface Props {
  product: any;
}

const SearchedProductCard = ({ product }: Props) => {
  return (
    <a href={`/products/${product.id}`}>
      <div className="p-[16px] h-[140px] flex gap-[12px] justify-between bg-white rounded-[8px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)] mb-[8px]">
        <ProductImage imageUrl={product.imageUrl} />
        <ProductInfo {...product} />
      </div>
    </a>
  );
};

export default SearchedProductCard;
