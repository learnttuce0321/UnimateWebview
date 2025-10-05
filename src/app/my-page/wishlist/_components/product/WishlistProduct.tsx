import { ProductPost } from 'types/Product';
import WishlistProductInfo from './WishlistProductInfo';
import WishlistProductListButton from './WishlistProductLikeButton';
import WishlistProductThumbnail from './WishlistProductThumbnail';

interface Props {
  product: ProductPost;
}

const WishlistProduct = ({ product }: Props) => {
  const { thumbnailUrl, title, universityName, price, currencyType } = product;
  return (
    <li className="flex w-full justify-between gap-[4px] rounded-[10px] bg-white p-[16px]">
      <div className="flex gap-[8px]">
        <WishlistProductThumbnail title={title} thumbnailUrl={thumbnailUrl} />
        <WishlistProductInfo
          title={title}
          universityName={universityName}
          price={price}
          currencyType={currencyType}
        />
      </div>
      <WishlistProductListButton />
    </li>
  );
};

export default WishlistProduct;
