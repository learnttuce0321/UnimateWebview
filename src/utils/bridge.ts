import { IOSBridge } from '../types/bridge';

// 브릿지 사용 가능 여부 체크
export const isBridgeAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.__UNIMATE__;
};

export const getBridge = (): IOSBridge | null => {
  return isBridgeAvailable() ? window.__UNIMATE__! : null;
};

// 브릿지 메소드 호출 헬퍼
/**
 * @description 브릿지 메소드 호출 헬퍼
 * @example
  import { callBridge, isBridgeAvailable } from '@/utils/bridge';

  if (isBridgeAvailable()) {
    callBridge('pickImage', (imageUrl) => {
      console.log('선택된 이미지:', imageUrl);
    });
  }
 */
export const callBridge = <T extends keyof IOSBridge>(
  method: T,
  ...args: Parameters<IOSBridge[T]>
): void => {
  const bridge = getBridge();
  if (bridge && typeof bridge[method] === 'function') {
    (bridge[method] as any)(...args);
  }
};
