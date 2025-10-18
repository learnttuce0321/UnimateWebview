import { BlockedUser } from 'types/User';
import BlockedMateProfileImage from './BlockedMateProfileImage';
import BlockMateButton from './BlockMateButton';
import { ErrorModalData } from 'components/modal/useModal';
import { ToastType } from 'components/toast';

interface Props {
  blockedUser: BlockedUser;
  openModal: (data: ErrorModalData) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const BlockedMate = ({ blockedUser, openModal, showToast }: Props) => {
  const { userId, profileImageUrl, nickname, isBlocked } = blockedUser;
  return (
    <li className="flex w-full justify-between">
      <div className="flex gap-[16px]">
        <BlockedMateProfileImage
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
        <span className="text-[16px] font-semibold leading-[16px] text-blue_gray-900">
          {nickname}
        </span>
      </div>
      <BlockMateButton
        isBlocked={isBlocked}
        userId={userId}
        openModal={openModal}
        showToast={showToast}
      />
    </li>
  );
};

export default BlockedMate;
