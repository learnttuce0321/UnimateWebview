import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_NOTIFICATION_SETTING } from 'modules/keyFactory/notification';

interface UpdateNotificationParams {
  priceChangedNotificationEnabled: boolean;
  saleEndedNotificationEnabled: boolean;
}

export const useMutationUpdateNotification = () => {
  return useMutation<Notification, ApiResponseError, UpdateNotificationParams>({
    mutationFn: ({
      priceChangedNotificationEnabled,
      saleEndedNotificationEnabled,
    }) =>
      fetchClient.PUT({
        url: API_NOTIFICATION_SETTING,
        body: {
          priceChangedNotificationEnabled,
          saleEndedNotificationEnabled,
        },
      }),
  });
};
