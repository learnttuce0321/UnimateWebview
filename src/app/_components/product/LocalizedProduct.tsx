'use client';

import LocalizedProductInfo from 'app/_components/product/LocalizedProductInfo';
import LocalizedProductThumbnail from 'app/_components/product/LocalizedProductThumbnail';
import { ProductPost } from 'types/Product';
import navigationScheme from 'utils/navigationScheme';

interface Props {
  product: ProductPost;
}

const LocalizedProduct = ({ product }: Props) => {
  const { id: productId, thumbnailUrl } = product;
  const { openWeb } = navigationScheme();

  const handleProductCardClick = () => {
    openWeb(`/product/${productId}`);
  };

  return (
    <li className="w-full" onClick={() => handleProductCardClick()}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <LocalizedProductThumbnail thumbnailUrl={thumbnailUrl} />
        <LocalizedProductInfo product={product} />
      </div>
    </li>
  );
};

export default LocalizedProduct;
