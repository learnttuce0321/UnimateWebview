import { ProductPost } from 'types/Product';
import MateSalesProductInfo from './MateSalesProductInfo';
import MateSalesProductThumbnail from './MateSalesProductThumbnail';

interface Props {
  product: ProductPost;
  onProductClick: (productId: number) => void;
}

const MateSalesProduct = ({ product, onProductClick }: Props) => {
  const { id: productId, thumbnailUrl } = product;

  return (
    <li
      className="flex w-full justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]"
      onClick={() => onProductClick(productId)}
    >
      <MateSalesProductThumbnail thumbnailUrl={thumbnailUrl} />
      <MateSalesProductInfo product={product} />
    </li>
  );
};

export default MateSalesProduct;
