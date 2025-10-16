import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_USER_BLOCK } from 'modules/keyFactory/user';

interface BlockUserParams {
  userId: string;
}

export const useMutationBlockMate = () => {
  return useMutation<void, ApiResponseError, BlockUserParams>({
    mutationFn: ({ userId }) =>
      fetchClient.POST({
        url: API_USER_BLOCK(userId),
      }),
  });
};
