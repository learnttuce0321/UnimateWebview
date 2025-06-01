import ProductPrice from 'app/inapp/_components/product/ProductPrice';
import ProductRegistrationMeta from 'app/inapp/_components/product/ProductRegistrationMeta';
import ProductTitle from 'app/inapp/_components/product/ProductTitle';
import ProductUserReaction from 'app/inapp/_components/product/ProductUserReaction';

interface Props {
  title: string;
  createdAt: string;
  price: number;
  isVerified: boolean;
  university: string;
  likeCount: number;
  chatCount: number;
}

const ProductInfo = ({
  title,
  createdAt,
  price,
  isVerified,
  university,
  likeCount,
  chatCount,
}: Props) => {
  return (
    <div className="flex flex-col justify-between w-[calc(100%-108px)]">
      <div className="flex flex-col gap-[6px] justify-start w-full">
        <ProductTitle title={title} />
        <ProductRegistrationMeta
          createdAt={createdAt}
          isVerified={isVerified}
          university={university}
        />
        <ProductPrice price={price} />
      </div>
      <ProductUserReaction likeCount={likeCount} chatCount={chatCount} />
    </div>
  );
};

export default ProductInfo;
