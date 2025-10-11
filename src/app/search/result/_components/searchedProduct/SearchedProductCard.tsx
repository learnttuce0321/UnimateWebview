import LocalizedProductInfo from 'app/_components/product/LocalizedProductInfo';
import LocalizedProductThumbnail from 'app/_components/product/LocalizedProductThumbnail';

interface Props {
  product: any;
}

const SearchedProductCard = ({ product }: Props) => {
  return (
    <a href={`/product/${product.id}`}>
      <div className="mb-[8px] flex h-[140px] justify-between gap-[12px] rounded-[8px] bg-white p-[16px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
        <LocalizedProductThumbnail thumbnailUrl={product.imageUrl} />
        <LocalizedProductInfo {...product} />
      </div>
    </a>
  );
};

export default SearchedProductCard;
