// 아래 파일들도 claude code 를 통해서 프로젝트 전반적으로 사용될만한 셀렉터들을 만들어 놓은거라, 본인 작업 내역 내에서 자유롭게 수정하면 됨

import { AppStore } from './createAppStore';

// 도시 관련 셀렉터
export const selectFavoriteCities = (state: AppStore) => state.favoriteCities;
export const selectSelectedCityId = (state: AppStore) => state.selectedCityId;
export const selectSelectedCity = (state: AppStore) =>
  state.favoriteCities.find((city) => city.id === state.selectedCityId) || null;

// 상품 관련 셀렉터
export const selectProducts = (state: AppStore) => state.products;
export const selectProductsByCityId = (cityId: string) => (state: AppStore) =>
  state.products.filter((product) => product.cityId === cityId);
export const selectProductById = (productId: string) => (state: AppStore) =>
  state.products.find((product) => product.id === productId);

// 검색 관련 셀렉터
export const selectSearchKeyword = (state: AppStore) => state.searchKeyword;
export const selectFilteredProducts = (state: AppStore) => {
  const { products, searchKeyword, selectedCityId } = state;

  let filtered = products;

  // 도시 필터링
  if (selectedCityId) {
    filtered = filtered.filter((product) => product.cityId === selectedCityId);
  }

  // 검색어 필터링
  if (searchKeyword.trim()) {
    const keyword = searchKeyword.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
  }

  return filtered;
};

// UI 상태 셀렉터
export const selectIsLoading = (state: AppStore) => state.isLoading;
export const selectError = (state: AppStore) => state.error;

// 복합 셀렉터
export const selectHasError = (state: AppStore) => state.error !== null;
export const selectIsEmpty = (state: AppStore) =>
  state.products.length === 0 && !state.isLoading;
export const selectCityProductCount = (cityId: string) => (state: AppStore) =>
  state.products.filter((product) => product.cityId === cityId).length;
