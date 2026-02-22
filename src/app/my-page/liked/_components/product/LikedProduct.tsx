import { LikeProduct } from 'types/Product';
import LikedProductInfo from './LikedProductInfo';
import LikedProductLikeButton from './LikedProductLikeButton';
import LikedProductThumbnail from './LikedProductThumbnail';

interface Props {
  product: LikeProduct;
}

const LikedProduct = ({ product }: Props) => {
  const {
    id: productId,
    thumbnailUrl,
    title,
    universityName,
    price,
    currencyType,
    isLiked,
  } = product;

  return (
    <li className="shadow-[0 0 10px 0 rgba(0, 0, 0, 0.05)] flex w-full justify-between gap-[4px] rounded-[10px] bg-white p-[16px]">
      <div className="flex gap-[8px]">
        <LikedProductThumbnail title={title} thumbnailUrl={thumbnailUrl} />
        <LikedProductInfo
          title={title}
          universityName={universityName}
          price={price}
          currencyType={currencyType}
        />
      </div>
      <LikedProductLikeButton productId={productId} isLiked={isLiked} />
    </li>
  );
};

export default LikedProduct;
