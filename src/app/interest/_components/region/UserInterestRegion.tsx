'use client';

import { useState } from 'react';
import Modal from 'components/modal/Modal';
import { useMutationDeleteInterestRegion } from 'hooks/users/useMutationDeleteInterestRegion';
import { useAppStore } from 'providers/ZustandProvider';
import { Region } from 'types/Region';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { MAIN_PAGE_DELETE_USER_INTEREST_REGION } from 'constants/storageSync';

interface Props {
  region: Region;
}

const UserInterestRegion = ({ region }: Props) => {
  const { regionName, isPrimary } = region;
  const [openDeleteCityModal, setOpenDeleteCityModal] =
    useState<boolean>(false);

  const { mutate } = useMutationDeleteInterestRegion();
  const removeInterestRegion = useAppStore(
    (state) => state.removeInterestRegion
  );

  const handleDeleteCityClick = () => {
    setOpenDeleteCityModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteCityModal(false);
  };

  const handleConfirmDelete = () => {
    mutate(
      { regionId: region.regionId },
      {
        onSuccess: (_, { regionId }) => {
          removeInterestRegion(regionId);
          setLocalStorageAndSync(MAIN_PAGE_DELETE_USER_INTEREST_REGION, {
            regionId,
          });
        },
        onSettled: () => {
          handleCloseModal();
        },
      }
    );
  };

  return (
    <>
      <li
        className={`flex items-center justify-between px-[16px] py-[10px] ${isPrimary ? 'text-blue-600_P' : 'text-blue_gray-700'} ${isPrimary && 'bg-blue_gray-50'} ${isPrimary ? 'border-blue-600_P' : 'border-blue_gray-300'} rounded-[10px] border-[1px] border-solid`}
      >
        <p className="max-w-[calc(100%-24px)] truncate">{regionName}</p>
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
            <span className="text-blue-600_P">{regionName}</span>
            을(를) 관심도시에서 해제하시겠습니까?
          </p>
        </Modal>
      )}
    </>
  );
};

export default UserInterestRegion;
