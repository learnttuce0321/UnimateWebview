import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_MY_PROFILE } from 'modules/keyFactory/user';

interface UpdateUserProfileParams {
  nickname: string;
  profileImageUrl: string;
}

export const useMutationUpdateUserProfile = () => {
  return useMutation<void, ApiResponseError, UpdateUserProfileParams>({
    mutationFn: ({ nickname, profileImageUrl }: UpdateUserProfileParams) => {
      return fetchClient.PATCH({
        url: API_MY_PROFILE,
        body: {
          nickname,
          profileImageUrl,
        },
      });
    },
  });
};
