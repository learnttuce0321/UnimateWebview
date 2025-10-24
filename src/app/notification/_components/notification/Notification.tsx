import { ToastType } from 'components/toast';
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

  return (
    <li
      className={`w-full rounded-[10px] ${isRead ? 'bg-gray-100' : 'bg-white'} relative flex flex-col gap-[10px] px-[18px] pb-[20px] pt-[16px]`}
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
