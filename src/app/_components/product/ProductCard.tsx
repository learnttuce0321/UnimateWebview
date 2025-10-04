'use client';

import ProductImage from 'app/_components/product/ProductImage';
import ProductInfo from 'app/_components/product/ProductInfo';
import { ProductPost } from '../../../types/Product';
import navigationScheme from '../../../utils/navigationScheme';

interface Props {
  product: ProductPost;
}

const ProductCard = ({ product }: Props) => {
  const { openWeb } = navigationScheme();
  const handleProductCardClick = (productId: number) => {
    openWeb(`/product/${productId}`);
  };

  return (
    <button
      onClick={() => handleProductCardClick(product.id)}
      className="w-full"
    >
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <ProductImage thumbnailUrl={product.thumbnailUrl} />
        <ProductInfo {...product} />
      </div>
    </button>
  );
};

export default ProductCard;
