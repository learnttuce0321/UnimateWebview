import { ToastType } from 'components/toast';
import { useMutationDeleteAllNotification } from 'hooks/notification/useMutationDeleteAllNotification';
import { useUpdateQueryData } from 'hooks/useUpdateQueryData';
import { API_NOTIFICATIONS } from 'modules/keyFactory/notification';

interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const NotificationDeleteMenu = ({
  isDeleting,
  setIsDeleting,
  showToast,
}: Props) => {
  const { queryDataInvalidator } = useUpdateQueryData();

  const { mutate } = useMutationDeleteAllNotification();

  if (!isDeleting) {
    return null;
  }

  const handleDeleteAllNotification = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          queryDataInvalidator([API_NOTIFICATIONS]);
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
      }
    );
  };

  return (
    <div className="mb-[16px] flex justify-end gap-[16px] text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
      <button onClick={handleDeleteAllNotification}>전체 삭제</button>
      <button onClick={() => setIsDeleting(false)}>취소</button>
    </div>
  );
};

export default NotificationDeleteMenu;
