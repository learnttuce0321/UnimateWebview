'use client';

import { useEffect, useState } from 'react';
import { useDebounceWithReset } from 'hooks/useDebounce';
import UniversitySearchInputIcon from './UniversitySearchInputIcon';
import { ActionType } from '../../_types/search';

interface Props {
  actionType: ActionType;
  handleChangeActionType: (actionType: ActionType) => void;
  inputValue: string;
  handleInputValueChange: (value: string) => void;
}

const SearchUniversityInput = ({
  actionType,
  handleChangeActionType,
  inputValue,
  handleInputValueChange,
}: Props) => {
  const [_value, _setValue] = useState(inputValue);
  const [debouncedValue, resetDebouncedValue] = useDebounceWithReset(
    _value,
    200
  );

  const handleDelete = () => {
    _setValue('');
    resetDebouncedValue(''); // 즉시 빈 값으로 리셋
    handleInputValueChange('');
    handleChangeActionType('setting');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
  };

  useEffect(() => {
    handleInputValueChange(debouncedValue);
  }, [debouncedValue, handleInputValueChange]);

  return (
    <div className="relative mb-[20px] mt-[10px] h-[50px] w-full px-[16px]">
      <input
        type="text"
        className="h-full w-full rounded-[40px] bg-gray-100 px-[16px] py-[17px]"
        placeholder="대학교명을 검색하세요"
        onFocus={() => handleChangeActionType('search')}
        value={_value}
        onChange={handleInputChange}
      />
      <UniversitySearchInputIcon
        actionType={actionType}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SearchUniversityInput;
