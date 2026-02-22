import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PROFILE_PRESIGNED_URL } from 'modules/keyFactory/user';

interface UserProfileImagePresignedUrlResponse {
  presignedUrl: string;
  key: string;
}

interface getUserProfileImagePresignedUrlParams {
  fileName: string;
}

export const useMutationGetProfileImagePresignedUrl = () => {
  return useMutation<
    UserProfileImagePresignedUrlResponse,
    ApiResponseError,
    getUserProfileImagePresignedUrlParams
  >({
    mutationFn: ({ fileName }: getUserProfileImagePresignedUrlParams) => {
      return fetchClient.POST({
        url: API_PROFILE_PRESIGNED_URL,
        body: {
          fileName,
        },
      });
    },
  });
};
