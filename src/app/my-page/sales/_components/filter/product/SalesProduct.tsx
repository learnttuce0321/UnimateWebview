import { SalesProduct as TSalesProduct } from 'types/Product';
import navigationScheme from 'utils/navigationScheme';
import SalesProductInfo from './SalesProductInfo';
import SalesProductThumbnail from './SalesProductThumbnail';
import SaleProductMore from './SaleProductMore';

interface Props {
  product: TSalesProduct;
}

const SalesProduct = ({ product }: Props) => {
  const { id, title, thumbnailUrl, isHidden } = product;
  const { openWeb } = navigationScheme();

  const handleProductClick = () => {
    openWeb(`/product/${id}`);
  };

  return (
    <li
      className="shadow-[0 0 10px 0 rgba(0, 0, 0, 0.05)] relative flex w-full gap-[12px] rounded-[10px] bg-white p-[16px]"
      onClick={handleProductClick}
    >
      <SalesProductThumbnail
        title={title}
        thumbnailUrl={thumbnailUrl}
        isHidden={isHidden}
      />
      <SalesProductInfo product={product} />
      <SaleProductMore />
    </li>
  );
};

export default SalesProduct;
