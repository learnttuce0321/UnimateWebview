'use client';

import { useAppStore } from 'providers/ZustandProvider';

const MyProfileImage = () => {
  const profileImageKey = useAppStore(
    (state) => state.userProfile.profileImageKey
  );

  if (!profileImageKey)
    return (
      <div className="relative">
        <img
          src="/images/svg/my-page/none-profile.svg"
          width={116}
          height={116}
          alt="유저 프로필"
        />
        <img
          src="/images/svg/my-page/icon-system-camera-button.svg"
          width={32}
          height={32}
          alt="프로필 등록"
          className="absolute bottom-0 right-0"
        />
      </div>
    );

  return <div></div>;
};

export default MyProfileImage;
