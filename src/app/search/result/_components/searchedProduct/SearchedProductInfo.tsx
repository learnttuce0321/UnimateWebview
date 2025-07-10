import SearchedProductPrice from 'app/search/result/_components/searchedProduct/SearchedProductPrice';
import SearchedProductRegistrationMeta from 'app/search/result/_components/searchedProduct/SearchedProductRegistrationMeta';
import SearchedProductTitle from 'app/search/result/_components/searchedProduct/SearchedProductTitle';
import SearchedProductUserReaction from 'app/search/result/_components/searchedProduct/SearchedProductUserReaction';

interface Props {
  title: string;
  createdAt: string;
  price: number;
  isVerified: boolean;
  university: string;
  likeCount: number;
  chatCount: number;
}

const SearchedProductInfo = ({
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
        <SearchedProductTitle title={title} />
        <SearchedProductRegistrationMeta
          createdAt={createdAt}
          isVerified={isVerified}
          university={university}
        />
        <SearchedProductPrice price={price} />
      </div>
      <SearchedProductUserReaction
        likeCount={likeCount}
        chatCount={chatCount}
      />
    </div>
  );
};

export default SearchedProductInfo;
