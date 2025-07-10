'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Modal from 'components/modal/Modal';

interface Props {
  city: {
    id: string;
    name: string;
  };
}

const SelectedFavoriteCity = ({ city }: Props) => {
  const [openDeleteCityModal, setOpenDeleteCityModal] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const cityId = searchParams.get('currentCityId');
  const isActive = city.id === cityId;

  const handleDeleteCityClick = () => {
    setOpenDeleteCityModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteCityModal(false);
  };

  const handleConfirmDelete = () => {
    console.log(`삭제된 도시 ID: ${cityId}`);
    handleCloseModal();
  };

  return (
    <>
      <li
        className={`flex items-center justify-between px-[16px] py-[10px] ${isActive ? 'text-blue-600_P' : 'text-blue_gray-700'} ${isActive && 'bg-blue_gray-50'} ${isActive ? 'border-blue-600_P' : 'border-blue_gray-300'} rounded-[10px] border-[1px] border-solid`}
      >
        <p className="max-w-[calc(100%-24px)] truncate">{city.name}</p>
        <button type="button" onClick={handleDeleteCityClick}>
          <img
            src="/images/svg/favorite/icon-system-close-small.svg"
            alt="삭제"
            width="24"
            height="24"
          />
        </button>
      </li>
      {openDeleteCityModal && (
        <Modal
          isOpened={openDeleteCityModal}
          confirmText="예"
          cancelText="아니요"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseModal}
          onOverlayClick={handleCloseModal}
        >
          <p className="text-[16px] font-medium leading-[22.4px] text-gray-900">
            <span className="text-blue-600_P">{city.name}</span>
            을(를) 관심도시에서 해제하시겠습니까?
          </p>
        </Modal>
      )}
    </>
  );
};

export default SelectedFavoriteCity;
