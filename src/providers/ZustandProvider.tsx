'use client';

import { useHydration } from 'hooks/useHydration';
import { ReactNode, createContext, useContext, useEffect, useRef } from 'react';
import { AppState, AppStore, createAppStore } from 'stores/createAppStore';
import { useStore } from 'zustand';

const StoreContext = createContext<ReturnType<typeof createAppStore> | null>(
  null
);

export interface StoreProviderProps {
  children: ReactNode;
  initialState?: Partial<AppState>;
}

export const StoreProvider = ({
  children,
  initialState,
}: StoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createAppStore>>();
  const hydrated = useHydration();

  if (!storeRef.current) {
    storeRef.current = createAppStore(initialState);
  }

  // SSR hydration 처리
  // CSR 환경임을 보장하고, persist 미들웨어의 rehydrate 함수 호출
  useEffect(() => {
    if (hydrated && storeRef.current) {
      storeRef.current.persist.rehydrate();
    }
  }, [hydrated]);

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('useAppStore must be used within StoreProvider');
  }

  return useStore(storeContext, selector);
};
