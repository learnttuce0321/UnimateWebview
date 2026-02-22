import DeleteNotificationButton from './DeleteNotificationButton';
import NotificationSettingButton from './NotificationSettingButton';

interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationSettingMenus = ({ isDeleting, setIsDeleting }: Props) => {
  return (
    <div className="flex gap-[22px]">
      <DeleteNotificationButton
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
      <NotificationSettingButton />
    </div>
  );
};

export default NotificationSettingMenus;
