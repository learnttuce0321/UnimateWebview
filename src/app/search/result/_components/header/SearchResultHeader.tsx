import SearchResultInput from 'app/search/result/_components/header/SearchResultInput';
import BackButton from 'components/navigation/BackButton';

interface Props {
  q: string;
}

const SearchResultHeader = ({ q }: Props) => {
  return (
    <header className="flex h-[50px] justify-between gap-[8px] px-[16px] py-[5px]">
      <BackButton className="py-[8px]" />
      <SearchResultInput q={q} />
    </header>
  );
};

export default SearchResultHeader;
