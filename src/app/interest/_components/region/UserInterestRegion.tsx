'use client';

import ErrorModalContent from 'components/modal/ErrorModalContent';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { MAIN_PAGE_DELETE_USER_INTEREST_REGION } from 'constants/storageSync';
import { useMutationDeleteInterestRegion } from 'hooks/users/useMutationDeleteInterestRegion';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import { Region } from 'types/Region';
import DeleteInterestRegionModalContent from './DeleteInterestRegionModalContent';

interface Props {
  region: Region;
}

const UserInterestRegion = ({ region }: Props) => {
  const { regionName, isPrimary } = region;
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();

  const { mutate } = useMutationDeleteInterestRegion();
  const removeInterestRegion = useAppStore(
    (state) => state.removeInterestRegion
  );

  const handleDeleteCityClick = () => {
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
    mutate(
      { regionId: region.regionId },
      {
        onSuccess: (_, { regionId }) => {
          removeInterestRegion(regionId);
          setLocalStorageAndSync(MAIN_PAGE_DELETE_USER_INTEREST_REGION, {
            regionId,
          });
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

      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
};

export default UserInterestRegion;
