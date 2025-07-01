'use client';

import { useState } from 'react';
import { ActionType } from 'app/favorite/_types/search';
import Modal from 'components/modal/Modal';

interface Props {
  selectedCity: {
    id: string;
    name: string;
  } | null;
  handleChangeActionType: (actionType: ActionType) => void;
}

const AddFavoriteCityButton = ({
  selectedCity,
  handleChangeActionType,
}: Props) => {
  const [openAddFavoriteCityModal, setOpenAddFavoriteCityModal] =
    useState<boolean>(false);

  const handleAddFavoriteCityClick = () => {
    if (!selectedCity) return;

    setOpenAddFavoriteCityModal(true);
  };

  const handleModalClose = () => {
    setOpenAddFavoriteCityModal(false);
  };

  const handleConfirmClick = () => {
    console.log(`Adding ${selectedCity?.name} to favorite cities...`);
    handleChangeActionType('setting');
    handleModalClose();
  };

  return (
    <>
      <button
        type="button"
        className={`fixed bottom-[10px] h-[50px] w-[calc(100%-32px)] rounded-[10px] text-white ${selectedCity ? 'bg-blue-600_P' : 'bg-blue_gray-500'}`}
        onClick={handleAddFavoriteCityClick}
      >
        등록하기
      </button>
      {openAddFavoriteCityModal && (
        <Modal
          isOpened={openAddFavoriteCityModal}
          confirmText="예"
          onConfirm={handleConfirmClick}
          cancelText="아니요"
          onCancel={handleModalClose}
          onOverlayClick={handleModalClose}
        >
          <p className="text-[16px] font-medium leading-[22.4px] text-gray-900">
            <span className="text-blue-600_P">{selectedCity?.name}</span>
            을(를) 관심도시에 추가하시겠습니까?
          </p>
        </Modal>
      )}
    </>
  );
};

export default AddFavoriteCityButton;
