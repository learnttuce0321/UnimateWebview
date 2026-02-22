'use client';

import { ActionType } from 'app/interest/_types/search';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import { useMutationAddInterestRegion } from 'hooks/users/useMutationAddInterestRegion';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import { SearchedRegion } from 'types/Region';
import { getDisplayRegionName } from 'utils/getDisplayRegionName';
import AddInterestRegionModalContent from './AddInterestRegionModalContent';
import MaximumInterestRegionErrorModalContent from '../region/MaximumInterestRegionErrorModalContent';

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
          selectedRegionName={getDisplayRegionName(selectedRegion)}
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
            admin1Code: selectedRegion.admin1Code,
            isPrimary: false,
          });
          setLocalStorageAndSync(UPDATE_USER_INFO, {});
          handleChangeActionType('setting');
        },
        onError: () => {
          openModal({
            children: <MaximumInterestRegionErrorModalContent />,
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
