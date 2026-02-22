import { PurchasedProduct } from 'types/Product';
import PurchasedProductMetadata from './PurchasedProductMetadata';
import PurchasedProductPrice from './PurchasedProductPrice';
import PurchasedProductTitle from './PurchasedProductTitle';
import PurchasedProductUserReaction from './PurchasedProductUserReaction';

interface Props {
  product: PurchasedProduct;
}

const PurchasedProductInfo = ({ product }: Props) => {
  const {
    title,
    universityName,
    price,
    likeCount,
    chatRoomCount,
    currencyType,
    purchasedAt,
  } = product;

  return (
    <div>
      <div>
        <PurchasedProductTitle title={title} />
        <PurchasedProductMetadata
          purchasedAt={purchasedAt}
          universityName={universityName}
        />
        <PurchasedProductPrice price={price} currencyType={currencyType} />
      </div>
      <PurchasedProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default PurchasedProductInfo;
