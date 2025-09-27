'use client';

import { useState, type ChangeEvent } from 'react';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import { useAppStore } from 'providers/ZustandProvider';

const MyNickname = () => {
  const userNickname = useAppStore((state) => state.userProfile.nickname);
  const [_nickname, setNickname] = useState<string>(userNickname ?? '');

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleConfirmButtonClick = () => {};

  return (
    <>
      <input
        className={`border-blue_gray-200 h-[50px] w-full border px-[16px] py-[14px] placeholder:text-[16px] placeholder:leading-[22.4px] placeholder:text-blue_gray-500`}
        value={_nickname}
        onChange={handleNicknameChange}
      />

      <BottomFixedConfirmButton
        buttonText="확인"
        onClick={handleConfirmButtonClick}
        isActive={!!_nickname}
      />
    </>
  );
};

export default MyNickname;
