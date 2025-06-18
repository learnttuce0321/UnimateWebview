import { type StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';

export interface AppState {
  // UI 상태
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
}

export interface AppActions {
  // UI 상태 액션
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 초기화
  reset: () => void;

  // 토큰 관련 액션
  setAccessToken: (token: string | null) => void;
}

export type AppStore = AppState & AppActions;
export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState>;

const defaultInitialState: AppState = {
  isLoading: false,
  error: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ5OTY5MzI0LCJleHAiOjE3NTc3NDUzMjR9.bDpurCfyQ906gPYbPzEnOkzoZpBxLElwXjKY3rwWj9Q',
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