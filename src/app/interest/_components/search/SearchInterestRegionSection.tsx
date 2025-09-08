'use client';

import { useState } from 'react';
import SearchedCitiesList from 'app/interest/_components/search/SearchedInterestRegionList';
import SearchInterestRegionInput from 'app/interest/_components/search/SearchInterestRegionInput';
import { ActionType } from 'app/interest/_types/search';
import dynamic from 'next/dynamic';

const DynamicUserInterestRegionList = dynamic(
  () => import('app/interest/_components/region/UserInterestRegionList'),
  {
    ssr: false,
  }
);
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
        <>
          <h3 className="mb-[16px] h-[17px] text-[14px] font-bold">
            나의 관심 도시
          </h3>
          <DynamicUserInterestRegionList />
        </>
      )}
    </section>
  );
};

export default SearchInterestRegionSection;
