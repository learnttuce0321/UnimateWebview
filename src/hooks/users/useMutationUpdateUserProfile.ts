import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_MY_PROFILE } from 'modules/keyFactory/user';

interface UpdateUserProfileParams {
  nickname: string;
  profileImageKey?: string;
}

export const useMutationUpdateUserProfile = () => {
  return useMutation<void, ApiResponseError, UpdateUserProfileParams>({
    mutationFn: ({ nickname, profileImageKey }: UpdateUserProfileParams) => {
      const body: any = { nickname };
      if (profileImageKey) {
        body.profileImageKey = profileImageKey;
      }
      return fetchClient.PATCH({
        url: API_MY_PROFILE,
        body,
      });
    },
  });
};
