'use client';

import { MouseEvent } from 'react';
import ErrorModalContent from 'components/modal/ErrorModalContent';
import { ErrorModalData } from 'components/modal/useModal';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import { useMutationChangePrimaryRegion } from 'hooks/users/useMutationChangePrimaryRegion';
import { useMutationDeleteInterestRegion } from 'hooks/users/useMutationDeleteInterestRegion';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import { Region } from 'types/Region';
import DeleteInterestRegionModalContent from './DeleteInterestRegionModalContent';
import DeletePrimaryInterestRegionErrorModalContent from './DeletePrimaryInterestRegionErrorModalContent';
import { getDisplayRegionName } from 'utils/getDisplayRegionName';

interface Props {
  region: Region;
  openModal: (data: ErrorModalData) => void;
}

const UserInterestRegion = ({ region, openModal }: Props) => {
  const { regionId, regionName, isPrimary } = region;
  const { mutate: mutateChangePrimaryRegion } =
    useMutationChangePrimaryRegion();
  const { mutate: mutateDeleteInterestRegion } =
    useMutationDeleteInterestRegion();
  const removeInterestRegion = useAppStore(
    (state) => state.removeInterestRegion
  );
  const changePrimaryRegion = useAppStore((state) => state.changePrimaryRegion);

  const handleCityClick = () => {
    mutateChangePrimaryRegion(
      { regionId },
      {
        onSuccess: () => {
          changePrimaryRegion(regionId);
          setLocalStorageAndSync(UPDATE_USER_INFO, {});
        },
      }
    );
  };

  const handleDeleteCityClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openModal({
      children: <DeleteInterestRegionModalContent regionName={regionName} />,
      confirmText: '예',
      onConfirm: () => {
        handleConfirmDelete();
      },
      cancelText: '아니요',
    });
  };

  const handleConfirmDelete = () => {
    mutateDeleteInterestRegion(
      { regionId: region.regionId },
      {
        onSuccess: (_, { regionId }) => {
          removeInterestRegion(regionId);
          setLocalStorageAndSync(UPDATE_USER_INFO, {});
        },
        onError: () => {
          openModal({
            children: <DeletePrimaryInterestRegionErrorModalContent />,
          });
        },
      }
    );
  };

  return (
    <>
      <li
        className={`flex items-center justify-between px-[16px] py-[10px] ${isPrimary ? 'text-blue-600_P' : 'text-blue_gray-700'} ${isPrimary && 'bg-blue_gray-50'} ${isPrimary ? 'border-blue-600_P' : 'border-blue_gray-300'} rounded-[10px] border-[1px] border-solid`}
        onClick={handleCityClick}
      >
        <p className="max-w-[calc(100%-24px)] truncate">
          {getDisplayRegionName(region)}
        </p>
        <button type="button" onClick={handleDeleteCityClick}>
          <img
            src="/images/svg/favorite/icon-system-close-small.svg"
            alt="삭제"
            width="24"
            height="24"
          />
        </button>
      </li>
    </>
  );
};

export default UserInterestRegion;
