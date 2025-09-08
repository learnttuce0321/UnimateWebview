'use client';

import navigationScheme from '../../../utils/navigationScheme';

const SearchButton = () => {
  const { openWeb } = navigationScheme();

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
