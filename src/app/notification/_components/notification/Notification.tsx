import { ToastType } from 'components/toast';
import { useMutationReadNotification } from 'hooks/notification/useMutationReadNotification';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_NOTIFICATIONS } from 'modules/keyFactory/notification';
import { Notification as TNotification } from 'types/notification';
import NotificationContent from './NotificationContent';
import NotificationDeleteButton from './NotificationDeleteButton';
import NotificationMetadata from './NotificationMetadata';

interface Props {
  isDeleting: boolean;
  notification: TNotification;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const Notification = ({ isDeleting, notification, showToast }: Props) => {
  const {
    id: notificationId,
    isRead,
    notificationType,
    createdAt,
    content,
  } = notification;

  const { infiniteQueryDataUpdater } = useUpdateQueryData();
  const { mutate } = useMutationReadNotification();

  const handleNotificationClick = () => {
    mutate(
      { notificationId },
      {
        onSuccess: () => {
          infiniteQueryDataUpdater<TNotification>(
            [API_NOTIFICATIONS],
            (_notification) => {
              if (_notification.id) {
                return {
                  ..._notification,
                  isRead: true,
                };
              }
              return _notification;
            }
          );
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
      }
    );
  };

  return (
    <li
      className={`w-full rounded-[10px] ${isRead ? 'bg-gray-100' : 'bg-white'} relative flex flex-col gap-[10px] px-[18px] pb-[20px] pt-[16px]`}
      onClick={handleNotificationClick}
    >
      <NotificationDeleteButton
        isDeleting={isDeleting}
        showToast={showToast}
        notificationId={notificationId}
      />
      <NotificationMetadata
        isRead={isRead}
        notificationType={notificationType}
        createdAt={createdAt}
      />
      <NotificationContent isRead={isRead} content={content} />
    </li>
  );
};

export default Notification;
