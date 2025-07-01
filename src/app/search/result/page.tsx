import SearchResultHeader from 'app/search/result/_components/header/SearchResultHeader';
import SearchedProductList from 'app/search/result/_components/searchedProduct/SearchedProductList';
import { normalizeString } from 'modules/normalize';
import SearchFilterBottomSheetContainer from './_components/bottomSheet/SearchFilterBottomSheetContainer';
import SearchResultFilters from './_components/filters/SearchResultFilters';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <div>
      <SearchResultHeader q={normalizeString(searchParams.q)} />
      <SearchResultFilters />
      <SearchedProductList />
      <SearchFilterBottomSheetContainer />
    </div>
  );
};

export default Page;
