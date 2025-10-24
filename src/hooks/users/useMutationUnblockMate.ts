import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_BLOCK_USER } from 'modules/keyFactory/user';

interface BlockMateParams {
  userId: number;
}

export const useMutationUnblockMate = () => {
  return useMutation<void, ApiResponseError, BlockMateParams>({
    mutationFn: ({ userId }) =>
      fetchClient.DELETE({
        url: API_BLOCK_USER(userId),
      }),
  });
};
