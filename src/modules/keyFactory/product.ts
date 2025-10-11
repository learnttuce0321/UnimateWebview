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
 * @POST 상품 이미지 업로드를 위한 Presigned URL 발급 API
 */
export const API_PRODUCT_POSTS_PRESIGNED_URL =
  '/api/v1/product-posts/presigned-url';

/**
 * @GET 내가 찜한 상품게시글 리스트 API
 */
export const API_MY_LIKE_PRODUCTS = '/api/v1/product-posts/my/likes';

/**
 * @GET 나의 판매내역 목록 조회 API
 */
export const API_MY_SALES_PRODUCTS = '/api/v1/product-posts/my/sales';

/**
 * @PATCH 상품 게시글 숨기기 API
 */
export const API_PRODUCT_HIDE = (productId: number) =>
  `/api/v1/product-posts/${productId}/hide`;

/**
 * @PATCH 상품 게시글 숨김 해제 API
 */
export const API_PRODUCT_UNHIDE = (productId: number) =>
  `/api/v1/product-posts/${productId}/unhide`;

/**
 * @DELETE 상품 게시글 삭제 API
 */
export const API_PRODUCT_DELETE = (productId: number) =>
  `/api/v1/product-posts/${productId}`;

/**
 * @POST 상품 게시글 찜 API
 */
export const API_PRODUCT_LIKE = (productId: number) => `
/api/v1/product-posts/${productId}/like`;

/**
 * @GET 상품 상세 조회 API
 */
export const API_PRODUCT_DETAIL = (productId: string | number) =>
  `/api/v1/product-posts/${productId}`;
