'use client';

import { useAppStore } from 'providers/ZustandProvider';

const ProfileImage = () => {
  const profileImageUrl = useAppStore(
    (state) => state.userProfile.profileImageUrl
  );

  return (
    <div className="h-[96px] w-[96px] rounded-full bg-gray-400">
      <img
        className="h-full w-full rounded-full object-cover"
        src={profileImageUrl}
        width={96}
        height={96}
        alt="프로필 이미지"
      />
    </div>
  );
};

export default ProfileImage;
