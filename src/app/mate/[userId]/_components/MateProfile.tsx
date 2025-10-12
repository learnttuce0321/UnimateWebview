'use client';

import { MateUser } from 'types/User';
import MateMetaData from './MateMetaData';
import MateNickname from './MateNickname';
import MateProfileImage from './MateProfileImage';

interface Props {
  mateProfile: MateUser;
}

const MateProfile = ({ mateProfile }: Props) => {
  const { nickname, profileImageUrl, reviewStats, university } = mateProfile;
  return (
    <div className="flex flex-col justify-center gap-[24px] rounded-[10px] bg-white p-[16px] pb-[24px] shadow-[0px_0px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-[22px]">
        <MateProfileImage
          nickname={nickname}
          profileImageUrl={profileImageUrl}
        />
        <MateNickname nickname={nickname} />
      </div>
      <MateMetaData university={university} reviewStats={reviewStats} />
    </div>
  );
};

export default MateProfile;
