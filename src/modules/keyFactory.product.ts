/**
 * @file keyFactory.ts
 * @description
 * 이 파일은 프로젝트 전반에서 사용되는 API endpoint들을 상수로 정의한 파일입니다.
 */

/**
 * @GET 상품 목록 조회 API
 * @POST 상품 등록 API
 *
 */
export const API_PRODUCT = '/api/v1/product-posts';

/**
 * @GET 상품 검색 API
 */
export const API_PRODUCTS_SEARCH = '/api/v1/product-posts/search';

/**
 * 상품 이미지 업로드를 위한 Presigned URL 발급 API
 */
export const API_PRODUCTS_POSTS_PRESIGNED_URL =
  '/api/v1/product-posts/presigned-url';
