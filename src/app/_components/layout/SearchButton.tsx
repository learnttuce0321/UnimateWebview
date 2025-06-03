'use client';

import { useRouter } from 'next/navigation';

const SearchButton = () => {
  const router = useRouter();

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
