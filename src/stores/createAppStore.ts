import { type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import { Region, UserInterestRegions } from '../types/Region';

export interface AppState {
  // UI 상태
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  isWebview: boolean;
  userInterestRegions: UserInterestRegions;
}

export interface AppActions {
  // UI 상태 액션
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 초기화
  reset: () => void;

  // 토큰 관련 액션
  setAccessToken: (token: string | null) => void;

  // 관심도시 설정
  addInterestRegion: (region: Region) => void;
  removeInterestRegion: (region: Region) => void;
}

export type AppStore = AppState & AppActions;
export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState>;

const defaultInitialState: AppState = {
  isLoading: false,
  error: null,
  accessToken: '',
  isWebview: false,
  userInterestRegions: [],
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

        // 토큰 관련 액션
        setAccessToken: (token) =>
          set((state) => {
            state.accessToken = token;
          }),

        addInterestRegion: (region) => {
          set((state) => {
            state.userInterestRegions = [...state.userInterestRegions, region];
          });
        },

        removeInterestRegion: (removeRegion) => {
          set((state) => {
            state.userInterestRegions = state.userInterestRegions.filter(
              (userRegion) => userRegion.regionId !== removeRegion.regionId
            );
          });
        },
      })),
      {
        name: 'unimate-store',
      }
    )
  );

  return appStore;
};

// 서버/클라이언트 양쪽에서 안전하게 사용할 수 있는 store getter
export const getStore = () => initializeStore();
