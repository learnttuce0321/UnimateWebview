/**
 * @file keyFactory.ts
 * @description
 * 이 파일은 프로젝트 전반에서 사용되는 API endpoint들을 상수로 정의한 파일입니다.
 */

/**
 * @GET 알림 목록 조회 API
 * @DELETE 알림 삭제 API
 */
export const API_NOTIFICATIONS = '/api/v1/notifications';

/**
 * @DELETE 알림 전체 삭제 API
 */
export const API_DELETE_ALL_NOTIFICATIONS = '/api/v1/notifications/all';

/**
 * @PATCH 알림 읽음 처리 API
 */
export const API_READ_NOTIFICATION = (notificationId: number) =>
  `/api/v1/notifications/${notificationId}/read`;

/**
 * @GET 알림 설정 조회 API
 * @PATCH 알림 설정 업데이트 API
 */
export const API_NOTIFICATION_SETTING = '/api/v1/notifications/settings';
