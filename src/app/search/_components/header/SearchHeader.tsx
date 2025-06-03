import BackButton from 'components/navigation/BackButton';
import SearchInput from './SearchInput';

const SearchHeader = () => {
  return (
    <header className="h-[50px] px-[16px] py-[5px] flex justify-between gap-[8px]">
      <BackButton className="py-[8px]" />
      <SearchInput />
    </header>
  );
};

export default SearchHeader;
