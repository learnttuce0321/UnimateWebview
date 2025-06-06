import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AppState, AppStore } from './createAppStore';

const initialState: AppState = {
  favoriteCities: [],
  selectedCityId: null,
  products: [],
  searchKeyword: '',
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,

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
              state.products[index] = { ...state.products[index], ...updates };
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
        reset: () => set(initialState),
      })),
      {
        name: 'unimate-storage',
        partialize: (state) => ({
          favoriteCities: state.favoriteCities,
          selectedCityId: state.selectedCityId,
        }),
      }
    ),
    {
      name: 'unimate-store',
    }
  )
);
