import BackButton from 'components/navigation/BackButton';
import SearchInput from './SearchInput';

interface Props {
  q: string;
}

const SearchHeader = ({ q }: Props) => {
  return (
    <header className="h-[50px] px-[16px] py-[5px] flex justify-between gap-[8px]">
      <BackButton className="py-[8px]" />
      <SearchInput q={q} />
    </header>
  );
};

export default SearchHeader;
