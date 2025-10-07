import { SalesProduct } from 'types/Product';
import SalesProductMetadata from './SalesProductMetadata';
import SalesProductPrice from './SalesProductPrice';
import SalesProductTitle from './SalesProductTitle';
import SalesProductTradeStatusTag from './SalesProductTradeStatusTag';
import SalesProductUserReaction from './SalesProductUserReaction';

interface Props {
  product: SalesProduct;
}

const SalesProductInfo = ({ product }: Props) => {
  const {
    title,
    createdAt,
    universityName,
    price,
    currencyType,
    tradeStatus,
    likeCount,
    chatRoomCount,
  } = product;
  return (
    <div className="flex w-[calc(100%-108px)] flex-col justify-between">
      <div>
        <SalesProductTitle title={title} />
        <SalesProductMetadata
          createdAt={createdAt}
          universityName={universityName}
        />
        <SalesProductPrice
          price={price}
          currencyType={currencyType}
          tradeStatus={tradeStatus}
        />
      </div>
      <SalesProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default SalesProductInfo;
