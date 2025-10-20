import SearchedProductPrice from 'app/search/result/_components/searchedProduct/SearchedProductPrice';
import SearchedProductRegistrationMeta from 'app/search/result/_components/searchedProduct/SearchedProductRegistrationMetadata';
import SearchedProductTitle from 'app/search/result/_components/searchedProduct/SearchedProductTitle';
import SearchedProductUserReaction from 'app/search/result/_components/searchedProduct/SearchedProductUserReaction';
import { ProductPost } from 'types/Product';

interface Props {
  product: ProductPost;
}

const SearchedProductInfo = ({ product }: Props) => {
  const {
    title,
    price,
    universityName,
    currencyType,
    tradeStatus,
    likeCount,
    chatRoomCount,
    createdAt,
  } = product;

  return (
    <div className="flex w-[calc(100%-108px)] flex-col justify-between">
      <div className="flex w-full flex-col justify-start gap-[6px]">
        <SearchedProductTitle title={title} />
        <SearchedProductRegistrationMeta
          createdAt={createdAt}
          universityName={universityName}
        />
        <SearchedProductPrice
          price={price}
          currencyType={currencyType}
          tradeStatus={tradeStatus}
        />
      </div>
      <SearchedProductUserReaction
        likeCount={likeCount}
        chatRoomCount={chatRoomCount}
      />
    </div>
  );
};

export default SearchedProductInfo;
