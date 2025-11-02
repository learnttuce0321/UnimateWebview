import { PurchasedProduct as TPurchasedProduct } from 'types/Product';
import PurchasedProductInfo from './PurchasedProductInfo';
import PurchasedProductMore from './PurchasedProductMore';
import PurchasedProductThumbnail from './PurchasedProductThumbnail';

interface Props {
  product: TPurchasedProduct;
}

const PurchasedProduct = ({ product }: Props) => {
  const { purchaseHistoryId, thumbnailUrl, title } = product;

  return (
    <li className="shadow-[0 0 10px 0 rgba(0, 0, 0, 0.05)] relative flex w-full justify-between gap-[12px] rounded-[10px] bg-white p-[16px]">
      <PurchasedProductThumbnail title={title} thumbnailUrl={thumbnailUrl} />
      <PurchasedProductInfo product={product} />
      <PurchasedProductMore purchaseHistoryId={purchaseHistoryId} />
    </li>
  );
};

export default PurchasedProduct;
