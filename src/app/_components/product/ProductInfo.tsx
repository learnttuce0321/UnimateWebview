import ProductPrice from 'app/_components/product/ProductPrice';
import ProductRegistrationMeta from 'app/_components/product/ProductRegistrationMeta';
import ProductTitle from 'app/_components/product/ProductTitle';
import ProductUserReaction from 'app/_components/product/ProductUserReaction';

interface Props {
  title: string;
  createdAt: string;
  price: number;
  universityName: string;
  likeCount: number;
  chatRoomCount: number;
}

const ProductInfo = ({
  title,
  createdAt,
  price,
  universityName,
  likeCount,
  chatRoomCount,
}: Props) => {
  return (
    <div className="flex w-[calc(100%-108px)] flex-col justify-between">
      <div className="flex w-full flex-col justify-start gap-[6px] text-start">
        <ProductTitle title={title} />
        <ProductRegistrationMeta
          createdAt={createdAt}
          universityName={universityName}
        />
        <ProductPrice price={price} />
      </div>
      <ProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default ProductInfo;
