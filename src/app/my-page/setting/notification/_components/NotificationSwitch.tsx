import { Notification } from 'types/notification';

interface Props {
  notificationKey: keyof Notification;
  value: boolean;
  handleChangeNotificationState: (
    key: keyof Notification,
    value: boolean
  ) => void;
}

const NotificationSwitch = ({
  notificationKey,
  value,
  handleChangeNotificationState,
}: Props) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => handleChangeNotificationState(notificationKey, !value)}
      className={`relative inline-flex h-[24px] w-[44px] items-center rounded-full transition-colors duration-200 ${
        value ? 'bg-blue-600_P' : 'bg-blue_gray-400'
      }`}
    >
      <span
        className={`inline-block h-[20px] w-[20px] transform rounded-full bg-white transition-transform duration-200 ${
          value ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  );
};

export default NotificationSwitch;
