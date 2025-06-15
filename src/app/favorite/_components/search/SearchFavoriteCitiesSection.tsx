'use client';

import { useState } from 'react';
import SelectedFavoriteCitiesList from 'app/favorite/_components/favoriteCities/SelectedFavoriteCitiesList';
import SearchedCitiesList from 'app/favorite/_components/search/SearchedCitiesList';
import SearchFavoriteCitiesInput from 'app/favorite/_components/search/SearchFavoriteCitiesInput';
import { ActionType } from 'app/favorite/_types/search';

const SearchFavoriteCitiesSection = () => {
  const [actionType, setActionType] = useState<ActionType>('setting');

  const handleChangeActionType = (value: ActionType) => {
    setActionType(value);
  };

  return (
    <section>
      <SearchFavoriteCitiesInput
        actionType={actionType}
        handleChangeActionType={handleChangeActionType}
      />
      {actionType === 'search' ? (
        <SearchedCitiesList
          inputValue=""
          handleChangeActionType={handleChangeActionType}
        />
      ) : (
        <SelectedFavoriteCitiesList />
      )}
    </section>
  );
};

export default SearchFavoriteCitiesSection;
