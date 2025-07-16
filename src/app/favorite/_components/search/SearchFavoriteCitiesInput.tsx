'use client';

import { useState } from 'react';
import SearchInputIcon from 'app/favorite/_components/search/SearchInputIcon';
import { ActionType } from 'app/favorite/_types/search';
// import { debounce } from 'app/modules/util';

interface Props {
  actionType: ActionType;
  handleChangeActionType: (actionType: ActionType) => void;
}

const SearchFavoriteCitiesInput = ({
  actionType,
  handleChangeActionType,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleDelete = () => {
    handleChangeActionType('setting');
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative mb-[20px] h-[50px] w-full">
      <input
        type="text"
        className="h-full w-full rounded-[40px] bg-gray-100 px-[16px] py-[17px]"
        placeholder="도시명을 검색하세요"
        onFocus={() => handleChangeActionType('search')}
        value={inputValue}
        onChange={handleInputChange}
      />
      <SearchInputIcon actionType={actionType} onDelete={handleDelete} />
    </div>
  );
};

export default SearchFavoriteCitiesInput;
