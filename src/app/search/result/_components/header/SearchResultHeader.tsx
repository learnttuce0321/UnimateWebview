import SearchResultInput from 'app/search/result/_components/header/SearchResultInput';
import BackButton from 'components/navigation/BackButton';

const SearchResultHeader = () => {
  return (
    <header className="h-[50px] px-[16px] py-[5px] flex justify-between gap-[8px]">
      <BackButton className="py-[8px]" />
      <SearchResultInput />
    </header>
  );
};

export default SearchResultHeader;
