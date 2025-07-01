import ProductPrice from 'app/_components/product/ProductPrice';
import ProductRegistrationMeta from 'app/_components/product/ProductRegistrationMeta';
import ProductTitle from 'app/_components/product/ProductTitle';
import ProductUserReaction from 'app/_components/product/ProductUserReaction';

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
    <div className="flex w-[calc(100%-108px)] flex-col justify-between">
      <div className="flex w-full flex-col justify-start gap-[6px]">
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
