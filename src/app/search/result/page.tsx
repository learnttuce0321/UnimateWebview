import SearchResultHeader from 'app/search/result/_components/header/SearchResultHeader';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <div>
      <SearchResultHeader />
      search result {searchParams.q}
    </div>
  );
};

export default Page;
