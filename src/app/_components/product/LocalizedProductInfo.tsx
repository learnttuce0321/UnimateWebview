import LocalizedProductMetadata from 'app/_components/product/LocalizedProductMetadata';
import LocalizedProductPrice from 'app/_components/product/LocalizedProductPrice';
import LocalizedProductTitle from 'app/_components/product/LocalizedProductTitle';
import LocalizedProductUserReaction from 'app/_components/product/LocalizedProductUserReaction';
import { ProductPost } from 'types/Product';

interface Props {
  product: ProductPost;
}

const LocalizedProductInfo = ({ product }: Props) => {
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
        <LocalizedProductTitle title={title} />
        <LocalizedProductMetadata
          createdAt={createdAt}
          universityName={universityName}
        />
        <LocalizedProductPrice
          price={price}
          currencyType={currencyType}
          tradeStatus={tradeStatus}
        />
      </div>
      <LocalizedProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default LocalizedProductInfo;
