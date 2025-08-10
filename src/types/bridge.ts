// 전역 window 타입 확장
declare global {
  interface Window {
    __UNIMATE__?: IOSBridge;
  }
}

export interface IOSBridge {
  pickImage(callback: (imageUrls: string[]) => void): void;
}
