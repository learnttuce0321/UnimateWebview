'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecentSearchStore } from '../../search/_hooks/useRecentSearchKeyword';

const SearchButton = () => {
  const router = useRouter();
  const initializeFromStorage = useRecentSearchStore(
    (state) => state.initializeFromStorage
  );

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <button onClick={() => router.push('/search')}>
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
