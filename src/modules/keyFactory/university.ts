/**
 * @file keyFactory.ts
 * @description
 * 이 파일은 프로젝트 전반에서 사용되는 API endpoint들을 상수로 정의한 파일입니다.
 */

/**
 * @POST 대학교 이메일 인증 코드 발송 API
 */
export const API_UNIVERSITY_EMAIL_CODE =
  '/api/v1/universities/email-verifications';

/**
 * @POST 대학교 이메일 인증 코드 인증 API
 */
export const API_UNIVERSITY_EMAIL_CODE_VERIFY =
  '/api/v1/universities/email-verifications/verify';
