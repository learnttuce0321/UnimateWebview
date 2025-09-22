'use client';

import { useEffect, useState } from 'react';
import RegionSearchInputIcon from 'app/interest/_components/search/RegionSearchInputIcon';
import { ActionType } from 'app/interest/_types/search';
import { useDebounceWithReset } from 'hooks/useDebounce';

interface Props {
  actionType: ActionType;
  handleChangeActionType: (actionType: ActionType) => void;
  inputValue: string;
  handleInputValueChange: (value: string) => void;
}

const SearchInterestRegionInput = ({
  actionType,
  handleChangeActionType,
  inputValue,
  handleInputValueChange,
}: Props) => {
  const [_value, _setValue] = useState(inputValue);
  const [debouncedValue] = useDebounceWithReset(_value, 200);

  const handleDelete = () => {
    handleChangeActionType('setting');
    _setValue('');
    handleInputValueChange('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
  };

  useEffect(() => {
    handleInputValueChange(debouncedValue);
  }, [debouncedValue, handleInputValueChange]);

  return (
    <div className="relative mb-[20px] h-[50px] w-full">
      <input
        type="text"
        className="h-full w-full rounded-[40px] bg-gray-100 px-[16px] py-[17px]"
        placeholder="도시명을 검색하세요"
        onFocus={() => handleChangeActionType('search')}
        value={_value}
        onChange={handleInputChange}
      />
      <RegionSearchInputIcon actionType={actionType} onDelete={handleDelete} />
    </div>
  );
};

export default SearchInterestRegionInput;
