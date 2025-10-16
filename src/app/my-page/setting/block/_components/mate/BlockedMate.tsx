import { BlockedUser } from 'types/User';
import BlockedMateProfileImage from './BlockedMateProfileImage';
import BlockMateButton from './BlockMateButton';

interface Props {
  blockedUser: BlockedUser;
}

const BlockedMate = ({ blockedUser }: Props) => {
  const { profileImageUrl, nickname, isBlocked } = blockedUser;
  return (
    <li className="flex justify-between w-full">
      <div className="flex gap-[16px]">
        <BlockedMateProfileImage
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
        <span className="text-[16px] font-semibold leading-[16px] text-blue_gray-900">
          {nickname}
        </span>
      </div>
      <BlockMateButton isBlocked={isBlocked} />
    </li>
  );
};

export default BlockedMate;
