import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_BLOCK_USER } from 'modules/keyFactory/user';
import { NotificationSetting } from 'types/notification';

interface BlockMateParams {
  userId: number | string;
}

export const useMutationBlockMate = () => {
  return useMutation<NotificationSetting, ApiResponseError, BlockMateParams>({
    mutationFn: ({ userId }) =>
      fetchClient.POST({
        url: API_BLOCK_USER(userId),
      }),
  });
};
