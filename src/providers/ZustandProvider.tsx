'use client';

import { useRef } from 'react';
import { useStore } from 'zustand';
import {
  initializeStore,
  InitialStore,
  Store,
  StoreProvider as Provider,
  StoreContext,
} from 'stores/rootStore';
import { AppStore } from 'stores/createAppStore';
import { useContext } from 'react';

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
