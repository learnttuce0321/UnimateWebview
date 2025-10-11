import { useEffect } from 'react';

/**
 * 다른 브라우저 탭에서 `storage` 이벤트가 트리거되도록 localStorage의 저장
 *
 * @param {string} eventKey - 업데이트할 localStorage의 키
 * @param {Record<string, any>} [data] - localStorage에 저장할 데이터
 */
export const setLocalStorageAndSync = (
  eventKey: string,
  data?: Record<string, any>
) => {
  const prevData = JSON.parse(localStorage.getItem(eventKey) ?? '{}');

  const nextData = JSON.stringify({
    ...prevData,
    ...data,
    _update: Date.now(),
  });

  localStorage.setItem(eventKey, nextData);
};

/**
 * 주어진 `eventKey`에 해당하는 localStorage의 변경 사항을 감지하고,
 * 변화가 있을 때마다 `onStorageChange` 콜백을 호출
 * 이 함수가 호출된 후, localStorage 항목을 삭제
 *
 * @param {string} eventKey - 감지할 localStorage의 키
 *        새로운 값(`newValue`)이 파라미터로 전달
 */

export function useStorageSync(
  eventKey: string,
  onStorageChange: (newValue?: Record<string, any>) => void
) {
  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key !== eventKey) return;
      if (event.oldValue !== null && event.newValue === null) return;

      const newValue = event.newValue ? JSON.parse(event.newValue) : {};
      onStorageChange(newValue);

      localStorage.removeItem(eventKey);
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, [eventKey, onStorageChange]);
}
