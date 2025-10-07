import { ProductPost } from 'types/Product';
import LikedProductInfo from './LikedProductInfo';
import LikedProductLikeButton from './LikedProductLikeButton';
import LikedProductThumbnail from './LikedProductThumbnail';

interface Props {
  product: ProductPost;
}

const LikedProduct = ({ product }: Props) => {
  const { thumbnailUrl, title, universityName, price, currencyType } = product;
  return (
    <li className="flex w-full justify-between gap-[4px] rounded-[10px] bg-white p-[16px]">
      <div className="flex gap-[8px]">
        <LikedProductThumbnail title={title} thumbnailUrl={thumbnailUrl} />
        <LikedProductInfo
          title={title}
          universityName={universityName}
          price={price}
          currencyType={currencyType}
        />
      </div>
      <LikedProductLikeButton />
    </li>
  );
};

export default LikedProduct;
