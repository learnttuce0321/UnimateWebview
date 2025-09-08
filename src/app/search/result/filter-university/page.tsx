'use client';

import { useState } from 'react';
import { University } from 'types/University';
import AddUniversityFilteringOptionButton from './_components/search/AddUniversityFilteringOptionButton';
import FilteringUniversityList from './_components/search/FilteringUniversityList';
import SearchUniversityInput from './_components/search/SearchUniversityInput';
import { ActionType } from './_types/search';

const Page = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [actionType, setActionType] = useState<ActionType>('setting');

  const handleChangeActionType = (value: ActionType) => {
    setActionType(value);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  const handleUniversityClick = (university: University) => {
    setSelectedUniversity(university);
  };

  return (
    <>
      <SearchUniversityInput
        actionType={actionType}
        handleChangeActionType={handleChangeActionType}
        inputValue={inputValue}
        handleInputValueChange={handleInputValueChange}
      />
      <FilteringUniversityList
        inputValue={inputValue}
        selectedUniversityId={selectedUniversity?.id ?? null}
        handleUniversityClick={handleUniversityClick}
      />
      <AddUniversityFilteringOptionButton
        selectedUniversityName={selectedUniversity?.name ?? ''}
        selectedUniversityId={selectedUniversity?.id}
      />
    </>
  );
};

export default Page;
