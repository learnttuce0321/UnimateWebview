'use client';

import { useAppStore } from 'providers/ZustandProvider';

const ProfileName = () => {
  const nickname = useAppStore((state) => state.userProfile.nickname);

  return (
    <p className="line-clamp-1 w-full text-[18px] font-bold text-blue_gray-900">
      {nickname}
    </p>
  );
};

export default ProfileName;
