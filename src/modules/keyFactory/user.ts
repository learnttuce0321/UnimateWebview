/**
 * @file keyFactory.ts
 * @description
 * 이 파일은 프로젝트 전반에서 사용되는 API endpoint들을 상수로 정의한 파일입니다.
 */

/**
 * @GET 관심지역 리스트 조회 API
 * @POST 개별 관심지역 저장 API
 */
export const API_USER_REGION = '/api/v1/users/regions';

/**
 * @GET 내 프로필 조회 API
 * @PATCH 내 프로필 수정 API
 */
export const API_MY_PROFILE = '/api/v1/users/me';

/**
 * @POST 프로필 이미지 업로드를 위한 PresignedUrl 발급 api
 */
export const API_PROFILE_PRESIGNED_URL = '/api/v1/users/presigned-url';

/**
 * @GET 유저 프로필 조회 API
 */
export const API_USER_PROFILE = (userId: number) => `/api/v1/users/${userId}`;

/**
 * @PATCH 기본 관심지역 설정 API
 */
export const API_USER_PRIMARY_REGION = (regionId: string) =>
  `/api/v1/users/regions/${regionId}/primary`;

/**
 *
 * @DELETE 관심지역 삭제 API
 */
export const API_USER_DELETE_REGION = (regionId: string) =>
  `/api/v1/users/regions/${regionId}`;
