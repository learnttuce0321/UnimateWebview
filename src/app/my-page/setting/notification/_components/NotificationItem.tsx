import { NotificationSetting } from 'types/notification';
import NotificationSwitch from './NotificationSwitch';

interface Props {
  notificationKey: keyof NotificationSetting;
  notificationName: string;
  value: boolean;
  handleChangeNotificationState: (
    key: keyof NotificationSetting,
    value: boolean
  ) => void;
}

const NotificationItem = ({
  notificationKey,
  notificationName,
  value,
  handleChangeNotificationState,
}: Props) => {
  return (
    <li className="flex items-center justify-between py-[16px]">
      <p className="text-[14px] leading-[14px] text-blue_gray-800">
        {notificationName}
      </p>
      <NotificationSwitch
        notificationKey={notificationKey}
        value={value}
        handleChangeNotificationState={handleChangeNotificationState}
      />
    </li>
  );
};

export default NotificationItem;
