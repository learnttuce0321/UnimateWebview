'use client';

import { ActionType } from 'app/interest/_types/search';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import ErrorModalContent from 'components/modal/ErrorModalContent';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { MAIN_PAGE_ADD_USER_INTEREST_REGION } from 'constants/storageSyncKeyFactory/main';
import { useMutationAddInterestRegion } from 'hooks/users/useMutationAddInterestRegion';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import { SearchedRegion } from 'types/Region';
import AddInterestRegionModalContent from './AddInterestRegionModalContent';

interface Props {
  selectedRegion: SearchedRegion | null;
  handleChangeActionType: (actionType: ActionType) => void;
}

const AddInterestRegionButton = ({
  selectedRegion,
  handleChangeActionType,
}: Props) => {
  const { mutate } = useMutationAddInterestRegion();
  const addInterestRegion = useAppStore((state) => state.addInterestRegion);

  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();

  const handleAddInterestRegionClick = () => {
    if (!selectedRegion) return;

    openModal({
      children: (
        <AddInterestRegionModalContent
          selectedRegionName={selectedRegion?.name}
        />
      ),
      confirmText: '예',
      cancelText: '아니요',
      onConfirm: () => {
        handleConfirmAddRegion();
      },
    });
  };

  const handleConfirmAddRegion = () => {
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
        onError: (error) => {
          openModal({
            children: (
              <ErrorModalContent
                errorMessage={error.message || '오류가 발생했습니다.'}
              />
            ),
          });
        },
      }
    );
  };

  return (
    <>
      <BottomFixedConfirmButton
        buttonText="등록하기"
        onClick={handleAddInterestRegionClick}
        isActive={!!selectedRegion}
      />

      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
};

export default AddInterestRegionButton;
