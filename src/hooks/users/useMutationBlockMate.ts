import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_BLOCK_USER } from 'modules/keyFactory/user';

interface BlockMateParams {
  userId: number | string;
}

export const useMutationBlockMate = () => {
  return useMutation<Notification, ApiResponseError, BlockMateParams>({
    mutationFn: ({ userId }) =>
      fetchClient.POST({
        url: API_BLOCK_USER(userId),
      }),
  });
};
