import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_READ_NOTIFICATION } from 'modules/keyFactory/notification';

interface ReadNotificationParams {
  notificationId: number;
}

export const useMutationReadNotification = () => {
  return useMutation<void, ApiResponseError, ReadNotificationParams>({
    mutationFn: ({ notificationId }) =>
      fetchClient.PATCH({
        url: API_READ_NOTIFICATION(notificationId),
      }),
  });
};
