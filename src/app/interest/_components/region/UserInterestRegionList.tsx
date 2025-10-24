'use client';

import SelectedInterestRegion from 'app/interest/_components/region/UserInterestRegion';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useAppStore } from 'providers/ZustandProvider';
import { selectInterestRegions } from 'stores/selectors';

const UserInterestRegionList = () => {
  const userInterestRegions = useAppStore(selectInterestRegions);

  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {userInterestRegions.map((region) => (
          <SelectedInterestRegion
            key={region.regionId}
            region={region}
            openModal={openModal}
          />
        ))}
      </ul>
      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
};

export default UserInterestRegionList;
