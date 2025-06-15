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
    <div className="flex flex-col justify-between w-[calc(100%-108px)]">
      <div className="flex flex-col gap-[6px] justify-start w-full">
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
