import SearchHeader from 'app/search/_components/header/SearchHeader';
import { normalizeString } from 'modules/normalize';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <>
      <SearchHeader q={normalizeString(searchParams.q)} />
      <div className="w-full h-[calc(100vh-50px)] pt-[30px] px-[16px]"></div>
    </>
  );
};

export default Page;
