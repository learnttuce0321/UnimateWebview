import { MouseEvent } from 'react';
import { Popup, usePopup } from 'components/popup';
import MateProfileMoreMenus from './MateProfileMoreMenus';
import Modal from 'components/modal/Modal';
import { Toast, useToast } from 'components/toast';
import { useModal } from 'components/modal/useModal';
import { useMutationBlockMate } from 'hooks/users/useMutationBlockMate';
import BlockMateConfirmModalContent from './BlockMateConfirmModalContent';
import { useParams } from 'next/navigation';
import BlockMateSuccessModalContent from './BlockMateSuccessModalContent';

const MateProfileMore = () => {
  const params = useParams();
  const userId = params.userId as string;

  const { popupState, openPopup, closePopup } = usePopup();
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { toast, showToast, hideToast } = useToast();

  const { mutateAsync } = useMutationBlockMate();

  const handleBlockMateClick = () => {
    openModal({
      children: <BlockMateConfirmModalContent />,
      confirmText: '차단하기',
      onConfirm: handleBlockUser,
      cancelText: '취소',
    });
  };

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openPopup({
      children: (
        <MateProfileMoreMenus handleBlockMateClick={handleBlockMateClick} />
      ),
      position: { right: '8px', top: '25px' },
    });
  };

  const handleBlockUser = async () => {
    await mutateAsync(
      { userId },
      {
        onSuccess: () => {
          openModal({
            children: <BlockMateSuccessModalContent />,
            confirmText: '확인',
            onConfirm: closePopup,
          });
        },
        onError: (error) => {
          showToast(error.message, 'error');
          closeModal();
          closePopup();
        },
      }
    );
  };

  return (
    <>
      <button onClick={handleMoreButtonClick}>
        <img
          src="/images/svg/mate/icon-system-more-vertical.svg"
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
          alt="더보기"
        />
      </button>
      <Popup popupState={popupState} onClose={closePopup} />
      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
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

export default MateProfileMore;
