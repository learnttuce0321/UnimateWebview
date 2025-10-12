import { Toast, useToast } from 'components/toast';
import { useMutationUpdateNotification } from 'hooks/notification/useMutationUpdateNotification';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_NOTIFICATION_SETTING } from 'modules/keyFactory/notification';
import { Notification } from 'types/notification';
import NotificationItem from './NotificationItem';

interface Props {
  notification: Notification;
}

const NameByNotification: Record<keyof Notification, string> = {
  priceChangedNotificationEnabled: '가격 변동 알림',
  saleEndedNotificationEnabled: '판매 종료 알림',
};

const TradingNotificationList = ({ notification }: Props) => {
  const { toast, showToast, hideToast } = useToast();

  const { queryDataUpdater } = useUpdateQueryData();
  const { mutate } = useMutationUpdateNotification();

  const handleChangeNotificationState = (
    key: keyof Notification,
    value: boolean
  ) => {
    mutate(
      { ...notification, [key]: value },
      {
        onSuccess: (response) => {
          queryDataUpdater([API_NOTIFICATION_SETTING], () => {
            return response;
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
      }
    );
  };

  return (
    <>
      <ul>
        {Object.entries(notification).map(([key, value]) => {
          return (
            <NotificationItem
              key={key}
              notificationKey={key as keyof Notification}
              notificationName={NameByNotification[key as keyof Notification]}
              value={value}
              handleChangeNotificationState={handleChangeNotificationState}
            />
          );
        })}
      </ul>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default TradingNotificationList;
