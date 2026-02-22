'use client';

import { useAppStore } from 'providers/ZustandProvider';

const VerifiedUniversityEmail = () => {
  const universityEmail = useAppStore(
    (state) => state.userProfile.universityEmail
  );

  if (!universityEmail) {
    return null;
  }

  return (
    <div className="h-[50px] w-full rounded-[5px] border border-gray-300 bg-gray-200 px-[16px] py-[14px] text-[16px] leading-[22.4px] text-blue_gray-700">
      <span>{universityEmail}</span>
    </div>
  );
};

export default VerifiedUniversityEmail;
