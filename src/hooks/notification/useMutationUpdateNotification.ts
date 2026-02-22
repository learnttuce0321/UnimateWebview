import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_NOTIFICATION_SETTING } from 'modules/keyFactory/notification';
import { NotificationSetting } from 'types/notification';

interface UpdateNotificationParams {
  priceChangedNotificationEnabled: boolean;
  saleEndedNotificationEnabled: boolean;
}

export const useMutationUpdateNotification = () => {
  return useMutation<
    NotificationSetting,
    ApiResponseError,
    UpdateNotificationParams
  >({
    mutationFn: ({
      priceChangedNotificationEnabled,
      saleEndedNotificationEnabled,
    }) =>
      fetchClient.PATCH({
        url: API_NOTIFICATION_SETTING,
        body: {
          priceChangedNotificationEnabled,
          saleEndedNotificationEnabled,
        },
      }),
  });
};
