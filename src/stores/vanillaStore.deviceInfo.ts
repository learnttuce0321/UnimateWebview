import { type StoreApi } from 'zustand';
import { createStore } from 'zustand';

interface DeviceInfo {
  accessToken: string;
  version: string;
  device: string;
  deviceId: string;
  isWebView: boolean;
}

interface StoreState {
  deviceInfo: DeviceInfo;
  setDeviceInfo: (headers: DeviceInfo) => void;
}

const deviceInfoStore: StoreApi<StoreState> = createStore((set) => ({
  deviceInfo: {
    accessToken: '',
    version: '',
    device: '',
    deviceId: '',
    isWebView: false,
  },
  setDeviceInfo: (deviceInfo) => set({ deviceInfo }),
}));

export default deviceInfoStore;
