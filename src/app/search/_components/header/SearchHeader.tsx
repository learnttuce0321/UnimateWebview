import BackButton from 'components/navigation/BackButton';
import SearchInput from './SearchInput';

interface Props {
  searchKeyword: string;
  onSearchKeywordChange: (keyword: string) => void;
}

const SearchHeader = ({ searchKeyword, onSearchKeywordChange }: Props) => {
  return (
    <header className="flex h-[50px] justify-between gap-[8px] px-[16px] py-[5px]">
      <BackButton className="py-[8px]" />
      <SearchInput
        searchKeyword={searchKeyword}
        onSearchKeywordChange={onSearchKeywordChange}
      />
    </header>
  );
};

export default SearchHeader;
