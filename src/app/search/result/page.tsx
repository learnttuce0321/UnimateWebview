import SearchResultHeader from 'app/search/result/_components/header/SearchResultHeader';
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
      search result {searchParams.q}
    </div>
  );
};

export default Page;
