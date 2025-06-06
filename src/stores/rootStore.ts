import { createContext } from 'react';
import { type StoreApi } from 'zustand';
import { AppState, AppStore, createAppStore } from './createAppStore';

export type Store = StoreApi<AppStore>;
export type InitialStore = Partial<AppState>;

export const initializeStore = (initialState?: InitialStore): Store => {
  return createAppStore(initialState);
};

export const StoreContext = createContext<Store | null>(null);
export const StoreProvider = StoreContext.Provider;