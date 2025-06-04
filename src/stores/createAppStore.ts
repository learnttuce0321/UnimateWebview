import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

// 앱 상태 타입 정의한 부분은 별도 타입 파일로 분리해도 좋을 것 같습니다.
// 현재는 간단하게 이 파일에 모두 넣어놨습니다.
// 본인이 작업한 부분에 맞도록 파일 분리해도 무방합니다.
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

export const createAppStore = (initialState?: Partial<AppState>) => {
  const mergedInitialState = { ...defaultInitialState, ...initialState };

  return createStore<AppStore>()(
    devtools(
      persist(
        immer((set, get) => ({
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
        // 여기서 persist 미들웨어를 통해 저장된 상태는 `store.persist.rehydrate()`로 복원 가능
        {
          name: 'unimate-storage',
          partialize: (state) => ({
            favoriteCities: state.favoriteCities,
            selectedCityId: state.selectedCityId,
          }),
          skipHydration: true, // SSR 지원을 위해 hydration 건너뛰기
        }
      ),
      {
        name: 'unimate-store',
      }
    )
  );
};
