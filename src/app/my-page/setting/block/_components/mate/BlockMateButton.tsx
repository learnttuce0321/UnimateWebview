import { ErrorModalData } from 'components/modal/useModal';
import { useMutationBlockMate } from 'hooks/users/useMutationBlockMate';
import { useMutationUnblockMate } from 'hooks/users/useMutationUnblockMate';
import UnblockMateConfirmModalContent from './UnblockMateConfirmModalContent';
import BlockMateConfirmModalContent from './BlockMateconfirmModalContent';
import { ToastType } from 'components/toast';
import SuccessBlockMateModalContent from './SuccessBlockMateModalContent';
import SuccessUnblockMateModalContent from './SuccessUnblockMateModalContent';

interface Props {
  isBlocked: boolean;
  userId: number;
  openModal: (data: ErrorModalData) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const BlockMateButton = ({
  isBlocked,
  userId,
  openModal,
  showToast,
}: Props) => {
  const { mutate: mutateBlockMate } = useMutationBlockMate();
  const { mutate: mutateUnblockMate } = useMutationUnblockMate();

  const buttonText = isBlocked ? '차단 해제' : '차단하기';
  const buttonStyle = isBlocked
    ? 'bg-blue-gray-300 text-blue_gray-500'
    : 'bg-light_peach text-tomato_red';

  const handleClick = () => {
    if (isBlocked) {
      openModal({
        children: <UnblockMateConfirmModalContent />,
        confirmText: '차단 해제',
        onConfirm: handleUnblockMate,
        cancelText: '취소',
      });
    } else {
      openModal({
        children: <BlockMateConfirmModalContent />,
        confirmText: '차단 해제',
        onConfirm: handleBlockMate,
        cancelText: '취소',
      });
    }
  };

  const handleBlockMate = () => {
    mutateBlockMate(
      { userId },
      {
        onSuccess: () => {
          openModal({
            children: <SuccessBlockMateModalContent />,
            confirmText: '확인',
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
      }
    );
  };
  const handleUnblockMate = () => {
    mutateUnblockMate(
      { userId },
      {
        onSuccess: () => {
          openModal({
            children: <SuccessUnblockMateModalContent />,
            confirmText: '확인',
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
        },
      }
    );
  };

  return (
    <button
      className={`text-[12px] font-medium leading-[12px] ${buttonStyle}`}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default BlockMateButton;
