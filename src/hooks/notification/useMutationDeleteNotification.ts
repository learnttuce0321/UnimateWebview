import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_NOTIFICATIONS } from 'modules/keyFactory/notification';

interface DeleteNotificationParams {
  notificationIds: number[];
}

export const useMutationDeleteNotification = () => {
  return useMutation<void, ApiResponseError, DeleteNotificationParams>({
    mutationFn: ({ notificationIds }) =>
      fetchClient.DELETE({
        url: API_NOTIFICATIONS,
        body: {
          notificationIds,
        },
      }),
  });
};
