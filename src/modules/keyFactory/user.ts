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
 * @POST 프로필 이미지 업로드를 위한 PresignedUrl 발급 API
 */
export const API_PROFILE_PRESIGNED_URL = '/api/v1/users/presigned-url';

/**
 * @GET 닉네임 중복 검사 API
 */
export const API_PROFILE_NICKNAME_EXIST = '/api/v1/users/nickname/exists';

/**
 * @GET 유저 프로필 조회 API
 */
export const API_USER_PROFILE = (userId: string) => `/api/v1/users/${userId}`;

/**
 * @PATCH 기본 관심지역 설정 API
 */
export const API_USER_PRIMARY_REGION = (regionId: number) =>
  `/api/v1/users/regions/${regionId}/primary`;

/**
 *
 * @DELETE 관심지역 삭제 API
 */
export const API_USER_DELETE_REGION = (regionId: number) =>
  `/api/v1/users/regions/${regionId}`;

/**
 * @GET 차단한 유저 목록 조회 API
 */
export const API_BLOCKED_USERS = '/api/v1/user-blocks';

/**
 * @POST 유저 차단 API
 * @DELETE 유저 차단 해제 API
 */
export const API_BLOCK_USER = (userId: number | string) =>
  `/api/v1/user-blocks/${userId}`;

/**
 * @DELETE 회원 탈퇴 API
 */
export const API_USER_WITHDRAWAL = '/api/v1/users/me';
