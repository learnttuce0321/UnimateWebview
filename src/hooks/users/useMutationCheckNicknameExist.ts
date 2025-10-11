import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_PROFILE_NICKNAME_EXIST } from 'modules/keyFactory/user';

interface CheckNicknameExistResponse {
  exists: boolean;
}

interface CheckNicknameExistParams {
  nickname: string;
}

export const useMutationCheckNicknameExist = () => {
  return useMutation<
    CheckNicknameExistResponse,
    ApiResponseError,
    CheckNicknameExistParams
  >({
    mutationFn: ({ nickname }: CheckNicknameExistParams) => {
      return fetchClient.GET({
        url: `${API_PROFILE_NICKNAME_EXIST}?nickname=${nickname}`,
      });
    },
  });
};
