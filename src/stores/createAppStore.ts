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
  // 사용자 설정
  favoriteCities: City[];
  selectedCityId: string | null;

  // 상품 관련
  products: Product[];
  searchKeyword: string;

  // UI 상태
  isLoading: boolean;
  error: string | null;
}

export interface AppActions {
  // 도시 관련 액션
  addFavoriteCity: (city: City) => void;
  removeFavoriteCity: (cityId: string) => void;
  setSelectedCity: (cityId: string | null) => void;

  // 상품 관련 액션
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  removeProduct: (productId: string) => void;

  // 검색 관련 액션
  setSearchKeyword: (keyword: string) => void;

  // UI 상태 액션
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 초기화
  reset: () => void;
}

export type AppStore = AppState & AppActions;

const defaultInitialState: AppState = {
  favoriteCities: [],
  selectedCityId: null,
  products: [],
  searchKeyword: '',
  isLoading: false,
  error: null,
};

// SSR 안전한 팩토리 함수
export const createAppStore = (
  initialState?: Partial<AppState>
): StoreApi<AppStore> => {
  const mergedInitialState = { ...defaultInitialState, ...initialState };

  return createStore<AppStore>()(
    devtools(
      persist(
        immer((set) => ({
          ...mergedInitialState,

          // 도시 관련 액션
          addFavoriteCity: (city) =>
            set((state) => {
              const exists = state.favoriteCities.some((c) => c.id === city.id);
              if (!exists) {
                state.favoriteCities.push(city);
              }
            }),

          removeFavoriteCity: (cityId) =>
            set((state) => {
              state.favoriteCities = state.favoriteCities.filter(
                (c) => c.id !== cityId
              );
              if (state.selectedCityId === cityId) {
                state.selectedCityId = null;
              }
            }),

          setSelectedCity: (cityId) =>
            set((state) => {
              state.selectedCityId = cityId;
            }),

          // 상품 관련 액션
          setProducts: (products) =>
            set((state) => {
              state.products = products;
            }),

          addProduct: (product) =>
            set((state) => {
              state.products.push(product);
            }),

          updateProduct: (productId, updates) =>
            set((state) => {
              const index = state.products.findIndex((p) => p.id === productId);
              if (index !== -1) {
                state.products[index] = {
                  ...state.products[index],
                  ...updates,
                };
              }
            }),

          removeProduct: (productId) =>
            set((state) => {
              state.products = state.products.filter((p) => p.id !== productId);
            }),

          // 검색 관련 액션
          setSearchKeyword: (keyword) =>
            set((state) => {
              state.searchKeyword = keyword;
            }),

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
            favoriteCities: state.favoriteCities,
            selectedCityId: state.selectedCityId,
          }),
          skipHydration: true,
        }
      ),
      {
        name: 'unimate-store',
      }
    )
  );
};
