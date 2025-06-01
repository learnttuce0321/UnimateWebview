import { useState } from 'react';
import SearchInputIcon from 'app/favorite/_components/search/SearchInputIcon';
// import { debounce } from 'app/modules/util';

interface Props {
  isInputFocused: boolean;
  handleFocus: (isFocused: boolean) => void;
}

const SearchFavoriteCitiesInput = ({ isInputFocused, handleFocus }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleDelete = () => {
    handleFocus(false);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full h-[50px] relative mb-[20px]">
      <input
        type="text"
        className="bg-gray-100 w-full h-full rounded-[40px] py-[17px] px-[16px]"
        placeholder="도시명을 검색하세요"
        onFocus={() => handleFocus(true)}
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchInputIcon
        isInputFocused={isInputFocused}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SearchFavoriteCitiesInput;
