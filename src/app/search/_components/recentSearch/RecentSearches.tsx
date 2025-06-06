import NoneRecentSearch from 'app/search/_components/recentSearch/NoneRecentSearch';
import { useRecentSearchStore } from 'app/search/_hooks/useRecentSearchKeyword';
import { useShallow } from 'zustand/shallow';

const RecentSearches = () => {
  const { recentSearches, deleteRecentSearch, clearRecentSearches } =
    useRecentSearchStore(
      useShallow((state) => ({
        recentSearches: state.recentSearches,
        deleteRecentSearch: state.deleteRecentSearch,
        clearRecentSearches: state.clearRecentSearches,
      }))
    );

  if (!recentSearches.length) return <NoneRecentSearch />;
  return (
    <div>
      <section className="flex justify-between items-center text-[14px]">
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
              className="flex gap-[5px] items-center w-full py-[8px]"
            >
              <img
                src="/images/svg/search/icon-system-history.svg"
                width={24}
                height={24}
                alt="최근 검색 아이콘"
              />
              <p className="flex-grow-[1] flex-shrink-[1] pl-[5px]">
                {keyword}
              </p>
              <button type="button" onClick={() => deleteRecentSearch(keyword)}>
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
