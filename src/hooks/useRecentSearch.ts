import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '_recent_search_words';
const MAX_RECENT_SEARCHES = 5;

export const useRecentSearch = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // localStorage에서 데이터 로드
  const initializeFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);
        setRecentSearches(Array.isArray(parsedData) ? parsedData : []);
      }
    } catch (error) {
      console.error('[ERROR] initialize recent searches', error);
      setRecentSearches([]);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // localStorage에 데이터 저장
  const saveToStorage = useCallback((searches: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('[ERROR] save recent searches', error);
    }
  }, []);

  // 최근 검색어 추가
  const addRecentSearch = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) return;

      setRecentSearches((prevSearches) => {
        // 이미 존재하는 키워드는 제거하고 맨 앞에 추가
        const filteredSearches = prevSearches.filter(
          (item) => item !== keyword
        );
        const updatedSearches = [keyword, ...filteredSearches].slice(
          0,
          MAX_RECENT_SEARCHES
        );

        // localStorage에 저장
        setTimeout(() => {
          saveToStorage(updatedSearches);
        }, 300);

        return updatedSearches;
      });
    },
    [saveToStorage]
  );

  // 최근 검색어 삭제
  const deleteRecentSearch = useCallback(
    (keyword: string) => {
      setRecentSearches((prevSearches) => {
        const updatedSearches = prevSearches.filter((item) => item !== keyword);
        saveToStorage(updatedSearches);
        return updatedSearches;
      });
    },
    [saveToStorage]
  );

  // 모든 최근 검색어 삭제
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 컴포넌트 마운트 시 localStorage에서 데이터 로드
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return {
    recentSearches,
    isInitialized,
    addRecentSearch,
    deleteRecentSearch,
    clearRecentSearches,
    initializeFromStorage,
  };
};
