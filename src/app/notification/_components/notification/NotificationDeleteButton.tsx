import { MouseEvent } from 'react';
import { ToastType } from 'components/toast';
import { useMutationDeleteNotification } from 'hooks/notification/useMutationDeleteNotification';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_NOTIFICATIONS } from 'modules/keyFactory/notification';
import { Notification } from 'types/notification';

interface Props {
  isDeleting: boolean;
  notificationId: number;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const NotificationDeleteButton = ({
  isDeleting,
  notificationId,
  showToast,
}: Props) => {
  const { mutate } = useMutationDeleteNotification();
  const { infiniteQueryDataUpdater } = useUpdateQueryData();

  if (!isDeleting) {
    return null;
  }

  const handleDeleteNotification = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    mutate(
      { notificationIds: [notificationId] },
      {
        onSuccess: (_, { notificationIds }) => {
          infiniteQueryDataUpdater<Notification>(
            [API_NOTIFICATIONS],
            (notification) => {
              if (notification.id === notificationIds[0]) {
                return null;
              }

              return notification;
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
    <button
      className="absolute right-[8px] top-[8px]"
      onClick={handleDeleteNotification}
    >
      <img
        src="/images/svg/notification/icon-system-close-small.svg"
        width={24}
        height={24}
        alt=""
      />
    </button>
  );
};

export default NotificationDeleteButton;
