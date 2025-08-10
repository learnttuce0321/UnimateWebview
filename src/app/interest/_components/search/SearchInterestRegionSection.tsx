'use client';

import { useState } from 'react';
import SelectedInterestRegionList from 'app/interest/_components/region/SelectedInterestRegionList';
import SearchedCitiesList from 'app/interest/_components/search/SearchedInterestRegionList';
import SearchInterestRegionInput from 'app/interest/_components/search/SearchInterestRegionInput';
import { ActionType } from 'app/interest/_types/search';

const SearchInterestRegionSection = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [actionType, setActionType] = useState<ActionType>('setting');

  const handleChangeActionType = (value: ActionType) => {
    setActionType(value);
  };

  const handleInputValueChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <section>
      <SearchInterestRegionInput
        actionType={actionType}
        handleChangeActionType={handleChangeActionType}
        inputValue={inputValue}
        handleInputValueChange={handleInputValueChange}
      />
      {actionType === 'search' ? (
        <SearchedCitiesList
          inputValue={inputValue}
          handleChangeActionType={handleChangeActionType}
        />
      ) : (
        <SelectedInterestRegionList />
      )}
    </section>
  );
};

export default SearchInterestRegionSection;
