'use client';

import { useAppStore } from 'providers/ZustandProvider';

const VerifiedUniversityEmail = () => {
  console.log('here');
  // TODO: 학교 이메일로 변경
  const university = useAppStore((state) => state.userProfile.university.name);

  return (
    <div className="h-[50px] w-full rounded-[5px] border border-gray-300 bg-gray-200 px-[16px] py-[14px] text-[16px] leading-[22.4px] text-blue_gray-700">
      <span>{university}</span>
    </div>
  );
};

export default VerifiedUniversityEmail;
