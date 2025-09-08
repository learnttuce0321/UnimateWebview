'use client';

import { useState } from 'react';
import { ActionType } from 'app/interest/_types/search';
import Modal from 'components/modal/Modal';
import { MAIN_PAGE_ADD_USER_INTEREST_REGION } from 'constants/storageSync';
import { useMutationAddInterestRegion } from 'hooks/users/useMutationAddInterestRegion';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import { SearchedRegion } from 'types/Region';

interface Props {
  selectedRegion: SearchedRegion | null;
  handleChangeActionType: (actionType: ActionType) => void;
}

const AddInterestRegionButton = ({
  selectedRegion,
  handleChangeActionType,
}: Props) => {
  const [openAddInterestRegionModal, setOpenAddInterestRegionModal] =
    useState<boolean>(false);
  const { mutate } = useMutationAddInterestRegion();
  const addInterestRegion = useAppStore((state) => state.addInterestRegion);

  const handleAddInterestRegionClick = () => {
    if (!selectedRegion) return;

    setOpenAddInterestRegionModal(true);
  };

  const handleModalClose = () => {
    setOpenAddInterestRegionModal(false);
  };

  const handleConfirmClick = () => {
    if (!selectedRegion) return;

    mutate(
      { regionId: selectedRegion.id },
      {
        onSuccess: () => {
          addInterestRegion({
            regionId: selectedRegion.id,
            regionName: selectedRegion.name,
            isPrimary: false,
          });
          setLocalStorageAndSync(MAIN_PAGE_ADD_USER_INTEREST_REGION, {
            regionId: selectedRegion.id,
            regionName: selectedRegion.name,
            isPrimary: false,
          });
          handleChangeActionType('setting');
        },
        onSettled: () => {
          handleModalClose();
        },
      }
    );
  };

  return (
    <>
      <button
        type="button"
        className={`fixed bottom-[10px] h-[50px] w-[calc(100%-32px)] rounded-[10px] text-white ${selectedRegion ? 'bg-blue-600_P' : 'bg-blue_gray-500'}`}
        onClick={handleAddInterestRegionClick}
      >
        등록하기
      </button>
      {openAddInterestRegionModal && (
        <Modal
          isOpened={openAddInterestRegionModal}
          confirmText="예"
          onConfirm={handleConfirmClick}
          cancelText="아니요"
          onCancel={handleModalClose}
          onOverlayClick={handleModalClose}
        >
          <p className="text-[16px] font-medium leading-[22.4px] text-gray-900">
            <span className="text-blue-600_P">{selectedRegion?.name}</span>
            을(를) 관심도시에 추가하시겠습니까?
          </p>
        </Modal>
      )}
    </>
  );
};

export default AddInterestRegionButton;
