'use client';

import { useAppStore } from 'providers/ZustandProvider';

const ProfileImage = () => {
  const profileImageKey = useAppStore(
    (state) => state.userProfile.profileImageKey
  );
  return (
    <div className="h-[96px] w-[96px] rounded-full bg-gray-400">
      <img src={profileImageKey} width={96} height={96} alt="프로필 이미지" />
    </div>
  );
};

export default ProfileImage;
