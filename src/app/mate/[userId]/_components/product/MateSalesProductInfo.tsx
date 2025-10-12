import { ProductPost } from 'types/Product';
import MateSalesProductMetaData from './MateSalesProductMetaData';
import MateSalesProductPrice from './MateSalesProductPrice';
import MateSalesProductTitle from './MateSalesProductTitle';
import MateSalesProductUserReaction from './MateSalesProductUserReaction';

interface Props {
  product: ProductPost;
}

const MateSalesProductInfo = ({ product }: Props) => {
  const {
    title,
    createdAt,
    price,
    universityName,
    likeCount,
    chatRoomCount,
    currencyType,
    tradeStatus,
  } = product;

  return (
    <div className="flex w-[calc(100%-108px-12px)] flex-col justify-between">
      <div className="flex w-full flex-col justify-start gap-[6px] text-start">
        <MateSalesProductTitle title={title} />
        <MateSalesProductMetaData
          createdAt={createdAt}
          universityName={universityName}
        />
        <MateSalesProductPrice
          price={price}
          currencyType={currencyType}
          tradeStatus={tradeStatus}
        />
      </div>
      <MateSalesProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default MateSalesProductInfo;
