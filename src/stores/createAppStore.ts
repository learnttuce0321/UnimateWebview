import { type StoreApi } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export interface City {
  id: string;
  name: string;
  country: string;
}

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

const defaultInitialState: AppState = {
  isLoading: false,
  error: null,
};

let appStore: StoreApi<AppStore> | null = null;

export const createAppStore = (
  initialState?: Partial<AppState>
): StoreApi<AppStore> => {
  if (appStore) return appStore;

  const mergedInitialState = { ...defaultInitialState, ...initialState };

  appStore = createStore<AppStore>()(
    devtools(
      persist(
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
          name: 'unimate-storage',
          partialize: (state) => ({
            // 새로고침시 유지되어야 하는 상태 필드
          }),
          skipHydration: true,
        }
      ),
      {
        name: 'unimate-store',
      }
    )
  );

  return appStore;
};

// 사용법
// import { useAppStore } from '../stores';

// const MyComponent = () => {
//   const products = useAppStore((state) => state.products);
//   const addProduct = useAppStore((state) => state.addProduct);

//   return <div>{products.length}개 상품</div>;
// };
