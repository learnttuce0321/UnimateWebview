interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteNotificationButton = ({ isDeleting, setIsDeleting }: Props) => {
  if (isDeleting) {
    return null;
  }

  return (
    <button onClick={() => setIsDeleting(true)}>
      <img
        className="h-[24px] w-[24px]"
        src="/images/svg/notification/icon-system-delete.svg"
        width={24}
        height={24}
        alt="알림 지우기"
      />
    </button>
  );
};

export default DeleteNotificationButton;
