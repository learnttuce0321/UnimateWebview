'use client';

import { useAppStore } from 'providers/ZustandProvider';

const MyProfileImage = () => {
  const profileImageUrl = useAppStore(
    (state) => state.userProfile.profileImageUrl
  );

  if (!profileImageUrl)
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
