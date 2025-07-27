import ProductImage from 'app/_components/product/ProductImage';
import ProductInfo from 'app/_components/product/ProductInfo';
import { ProductPost } from 'app/register/_type/registerType';

interface Props {
  product: ProductPost;
}

const ProductCard = ({ product }: Props) => {
  return (
    <a href={`/products/${product.id}`}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <ProductImage thumbnailUrl={product.thumbnailUrl} />
        <ProductInfo {...product} />
      </div>
    </a>
  );
};

export default ProductCard;
