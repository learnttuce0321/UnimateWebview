import { type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import { Region } from '../types/Region';

export interface AppState {
  accessToken: string | null;
  isWebview: boolean;
  userInterestRegions: Region[];
}

export interface AppActions {
  // 관심도시 설정
  getPrimaryRegion: () => Region | undefined;
  addInterestRegion: (region: Region) => void;
  removeInterestRegion: (regionId: string) => void;
  changePrimaryRegion: (regionId: string) => void;
}

export type AppStore = AppState & AppActions;
export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState>;

const defaultInitialState: AppState = {
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
      immer((set, get) => ({
        ...mergedInitialState,
        addInterestRegion: (region) => {
          set((state) => {
            state.userInterestRegions = [...state.userInterestRegions, region];
          });
        },

        getPrimaryRegion: () => {
          return get().userInterestRegions.find((region) => region.isPrimary);
        },

        removeInterestRegion: (regionId) => {
          set((state) => {
            state.userInterestRegions = state.userInterestRegions.filter(
              (userRegion) => userRegion.regionId !== regionId
            );
          });
        },

        changePrimaryRegion: (regionId) => {
          set((state) => {
            state.userInterestRegions = state.userInterestRegions.map(
              (region) => ({
                ...region,
                isPrimary: region.regionId === regionId,
              })
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
