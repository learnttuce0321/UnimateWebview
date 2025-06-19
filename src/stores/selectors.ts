import { AppStore } from './rootStore';

// UI 상태 셀렉터
export const selectIsLoading = (state: AppStore) => state.isLoading;
export const selectError = (state: AppStore) => state.error;
