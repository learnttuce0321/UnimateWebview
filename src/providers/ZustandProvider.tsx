'use client';

import React, { useContext, useRef } from 'react';
import { useStore } from 'zustand';
import deviceInfoStore from 'stores/vanillaStore.deviceInfo';
import {
  AppStore,
  InitialStore,
  StoreProvider as Provider,
  Store,
  StoreContext,
  initializeStore,
} from '../stores/rootStore';

interface ZustandProviderProps {
  children: React.ReactNode;
  initialState: InitialStore;
}

const ZustandProvider: React.FC<ZustandProviderProps> = ({
  children,
  initialState,
}) => {
  const storeRef = useRef<Store>();

  if (!storeRef.current) {
    storeRef.current = initializeStore(initialState);

    deviceInfoStore.getState().setDeviceInfo({
      accessToken: initialState.accessToken ?? '',
      device: initialState.deviceInfo?.device ?? '',
      deviceId: initialState.deviceInfo?.deviceId ?? '',
      version: initialState.deviceInfo?.deviceId ?? '',
      isWebView: initialState?.isWebview ?? false,
    });
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
