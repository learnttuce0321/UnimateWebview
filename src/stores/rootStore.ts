import { createContext } from 'react';
import { type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: 'USD' | 'KRW';
  images: string[];
  description: string;
  cityId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  // UI 상태
  isLoading: boolean;
  error: string | null;
}

export interface AppActions {
  // UI 상태 액션
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 초기화
  reset: () => void;
}

export type AppStore = AppState & AppActions;
export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState>;

const defaultInitialState: AppState = {
  isLoading: false,
  error: null,
};

let appStore: StoreApi<AppStore> | null = null;

export const initializeStore = (initialState?: InitialStore): Store => {
  if (appStore) return appStore;

  const mergedInitialState = { ...defaultInitialState, ...initialState };

  appStore = createStore<AppStore>()(
    devtools(
      immer((set) => ({
        ...mergedInitialState,
        // UI 상태 액션
        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading;
          }),

        setError: (error) =>
          set((state) => {
            state.error = error;
          }),

        // 초기화
        reset: () => set(mergedInitialState),
      })),
      {
        name: 'unimate-store',
      }
    )
  );

  return appStore;
};

export const StoreContext = createContext<Store | null>(null);
export const StoreProvider = StoreContext.Provider;
