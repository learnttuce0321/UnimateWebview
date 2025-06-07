import SearchResultHeader from 'app/search/result/_components/header/SearchResultHeader';
import SearchedProductList from 'app/search/result/_components/searchedProduct/SearchedProductList';
import { normalizeString } from 'modules/normalize';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <div>
      <SearchResultHeader q={normalizeString(searchParams.q)} />
      <div className="w-full h-[50px] bg-slate-400"></div>
      <SearchedProductList />
    </div>
  );
};

export default Page;
