import { create } from 'zustand';
import { FilterType } from 'app/search/result/_type/searchResultFilter.type';

interface SearchFilterBottomSheetState {
  isOpen: boolean;
  openedFilter: FilterType | null;
  openSheet: (filter: FilterType) => void;
  closeSheet: () => void;
}

export const useSearchFilterBottomSheetStore =
  create<SearchFilterBottomSheetState>((set) => ({
    isOpen: false,
    openedFilter: null,

    openSheet: (filter) =>
      set({
        isOpen: true,
        openedFilter: filter,
      }),

    closeSheet: () =>
      set({
        isOpen: false,
        openedFilter: null,
      }),
  }));
