import {
  API_PRODUCTS_POSTS,
  API_PRODUCTS_POSTS_PRESIGNED_URL,
} from 'modules/keyFactory.product';
import {
  PresignedUrlRequest,
  PresignedUrlListResponse,
  ProductPostCreateRequest,
} from '../_type/registerType';
import fetchClient from 'modules/fetchClient';

export const registerApi = {
  getPresignedUrl: async (
    request: PresignedUrlRequest
  ): Promise<PresignedUrlListResponse> => {
    try {
      const response = await fetchClient.POST<PresignedUrlListResponse>(
        {
          url: API_PRODUCTS_POSTS_PRESIGNED_URL,
          body: request,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response;
    } catch (error) {
      console.error('API Error Details:', error);
      throw error;
    }
  },

  createProductPost: async (
    request: ProductPostCreateRequest
  ): Promise<void> => {
    try {
      await fetchClient.POST<void>(
        {
          url: API_PRODUCTS_POSTS,
          body: request,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      throw new Error('Failed to create product post');
    }
  },
};
