import { create } from 'zustand';

interface RecentSearchState {
  recentSearches: string[];
  initializeFromStorage: () => void;
  addRecentSearch: (keyword: string) => void;
  deleteRecentSearch: (keyword: string) => void;
  clearRecentSearches: () => void;
}

const STORAGE_KEY = '_recent_search_words';

export const useRecentSearchStore = create<RecentSearchState>((set, get) => ({
  recentSearches: [],

  initializeFromStorage: () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        set({ recentSearches: parsedData });
      } catch (error: unknown) {
        console.error('[ERROR] initialize recent searches', error);
        set({ recentSearches: [] });
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },

  addRecentSearch: (keyword: string) => {
    const { recentSearches } = get();
    if (!keyword || recentSearches.includes(keyword)) return;

    const updatedSearches = [keyword, ...recentSearches].slice(0, 5);
    set({ recentSearches: updatedSearches });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
  },

  deleteRecentSearch: (keyword: string) => {
    const { recentSearches } = get();
    const updatedSearches = recentSearches.filter((item) => item !== keyword);
    set({ recentSearches: updatedSearches });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
  },

  clearRecentSearches: () => {
    set({ recentSearches: [] });

    localStorage.removeItem(STORAGE_KEY);
  },
}));
