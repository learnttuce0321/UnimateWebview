'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import NoneRecentSearch from 'app/search/_components/recentSearch/NoneRecentSearch';
import { useRecentSearch } from 'hooks/useRecentSearch';

const RecentSearches = () => {
  const router = useRouter();
  const {
    recentSearches,
    isInitialized,
    deleteRecentSearch,
    clearRecentSearches,
  } = useRecentSearch();

  if (!isInitialized) return null;
  if (!recentSearches.length) return <NoneRecentSearch />;

  const handleRecentSearchClick = (keyword: string) => {
    router.replace(`/search/result?q=${keyword}`);
  };
  const handleDeleteRecentSearch = (
    e: MouseEvent<HTMLButtonElement>,
    keyword: string
  ) => {
    e.stopPropagation();
    deleteRecentSearch(keyword);
  };

  return (
    <div>
      <section className="flex items-center justify-between text-[14px]">
        <p className="text-blue_gray-900">최근 검색어</p>
        <button
          type="button"
          className="text-blue_gray-700"
          onClick={clearRecentSearches}
        >
          전체 삭제
        </button>
      </section>
      <ul className="mt-[15px]">
        {recentSearches.map((keyword) => {
          return (
            <li
              key={keyword}
              className="flex w-full items-center gap-[5px] py-[8px]"
              onClick={() => handleRecentSearchClick(keyword)}
            >
              <img
                src="/images/svg/search/icon-system-history.svg"
                width={24}
                height={24}
                alt="최근 검색 아이콘"
              />
              <p className="flex-shrink-[1] flex-grow-[1] pl-[5px]">
                {keyword}
              </p>
              <button
                type="button"
                onClick={(event) => handleDeleteRecentSearch(event, keyword)}
              >
                <img
                  src="/images/svg/search/icon-system-close-small.svg"
                  width={24}
                  height={24}
                  alt="최근 검색 삭제 아이콘"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentSearches;
