'use client';

import { createContext } from 'react';
import {
  initializeStore,
  type Store,
  type InitialStore,
} from './createAppStore';

export const StoreContext = createContext<Store | null>(null);
export const StoreProvider = StoreContext.Provider;

// SSR을 위한 store 초기화 및 내보내기
export { initializeStore, type Store, type InitialStore };
