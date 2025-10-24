import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_DELETE_ALL_NOTIFICATIONS } from 'modules/keyFactory/notification';

export const useMutationDeleteAllNotification = () => {
  return useMutation<void, ApiResponseError, unknown>({
    mutationFn: () =>
      fetchClient.DELETE({
        url: API_DELETE_ALL_NOTIFICATIONS,
      }),
  });
};
