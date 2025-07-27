'use client';

import { useEffect } from 'react';
import navigationScheme from '../../../utils/navigationScheme';
import { useRecentSearchStore } from '../../search/_hooks/useRecentSearchKeyword';

const SearchButton = () => {
  const initializeFromStorage = useRecentSearchStore(
    (state) => state.initializeFromStorage
  );
  const { openWeb } = navigationScheme();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <button onClick={() => openWeb('/search')}>
      <img
        src="/images/svg/home/icon-system-search.svg"
        alt="검색 아이콘"
        width="24"
        height="24"
      />
    </button>
  );
};

export default SearchButton;
