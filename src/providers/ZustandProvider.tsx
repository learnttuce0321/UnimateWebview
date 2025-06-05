'use client';

import { useContext, useRef } from 'react';
import { AppStore } from 'stores/createAppStore';
import {
  InitialStore,
  StoreProvider as Provider,
  Store,
  StoreContext,
  initializeStore,
} from 'stores/rootStore';
import { useStore } from 'zustand';

interface ZustandProviderProps {
  children: React.ReactNode;
  initialState?: InitialStore;
}

const ZustandProvider: React.FC<ZustandProviderProps> = ({
  children,
  initialState,
}) => {
  const storeRef = useRef<Store>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(initialState);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('useAppStore must be used within ZustandProvider');
  }

  return useStore(storeContext, selector);
};

export default ZustandProvider;
