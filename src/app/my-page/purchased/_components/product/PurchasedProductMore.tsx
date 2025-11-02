'use client';

import { MouseEvent } from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { Popup, usePopup } from 'components/popup';
import { Toast, useToast } from 'components/toast';
import PurchasedProductMoreMenus from './PurchasedProductMoreMenus';

interface Props {
  purchaseHistoryId: number;
}

const PurchasedProductMore = ({ purchaseHistoryId }: Props) => {
  const { popupState, openPopup, closePopup } = usePopup();
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { toast, showToast, hideToast } = useToast();

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openPopup({
      children: (
        <PurchasedProductMoreMenus
          purchaseHistoryId={purchaseHistoryId}
          closePopup={closePopup}
          openModal={openModal}
          showToast={showToast}
        />
      ),
      position: { right: '12px', top: '32px' },
    });
  };

  return (
    <>
      <button
        className="absolute right-[8px] top-[8px]"
        onClick={handleMoreButtonClick}
      >
        <img
          src="/images/svg/my-page/icon-system-more-vertical.svg"
          width={24}
          height={24}
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

export default PurchasedProductMore;
