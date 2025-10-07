import { type StoreApi } from 'zustand';
import { createStore } from 'zustand';
import { Region } from 'types/Region';
import { User } from 'types/User';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const DEFAULT_PROFILE: User = {
  nickname: '',
  profileImageUrl: '',
  university: {},
  interestRegions: {
    interestRegions: [],
  },
};

export interface DeviceInfo {
  device: string;
  deviceId: string;
  version: string;
}

export interface AppState {
  userProfile: User;
  isLogin: boolean;
}

export interface VanillaAppState {
  accessToken: string;
  isWebview: boolean;
  deviceInfo: DeviceInfo;
}

export interface AppActions {
  // 관심도시 설정
  addInterestRegion: (region: Region) => void;
  removeInterestRegion: (regionId: string) => void;
  changePrimaryRegion: (regionId: string) => void;
}

export type AppStore = AppState & AppActions;
export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState> & Partial<VanillaAppState>;

const defaultInitialState: Omit<AppState, 'accessToken' | 'isWebview'> = {
  userProfile: DEFAULT_PROFILE,
  isLogin: false,
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
            state.userProfile.interestRegions.interestRegions = [
              ...state.userProfile.interestRegions.interestRegions,
              region,
            ];
          });
        },

        removeInterestRegion: (regionId) => {
          set((state) => {
            state.userProfile.interestRegions.interestRegions =
              state.userProfile.interestRegions.interestRegions?.filter(
                (userRegion) => userRegion.regionId !== regionId
              );
          });
        },

        changePrimaryRegion: (regionId) => {
          set((state) => {
            state.userProfile.interestRegions.interestRegions =
              state.userProfile.interestRegions.interestRegions?.map(
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
