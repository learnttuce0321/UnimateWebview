'use client';

import { useState } from 'react';
import SearchedCitiesList from 'app/inapp/favorite/_components/search/SearchedCitiesList';
import SearchFavoriteCitiesInput from 'app/inapp/favorite/_components/search/SearchFavoriteCitiesInput';
import SelectedFavoriteCitiesList from 'app/inapp/favorite/_components/search/SelectedFavoriteCitiesList';

const SearchFavoriteCitiesSection = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = (isInputFocused: boolean) => {
    setIsInputFocused(isInputFocused);
  };

  return (
    <section>
      <SearchFavoriteCitiesInput
        isInputFocused={isInputFocused}
        handleFocus={handleFocus}
      />
      {isInputFocused ? (
        <SearchedCitiesList inputValue="" handleFocus={handleFocus} />
      ) : (
        <SelectedFavoriteCitiesList />
      )}
    </section>
  );
};

export default SearchFavoriteCitiesSection;
