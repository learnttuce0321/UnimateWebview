'use client';

import { type ChangeEvent } from 'react';

interface Props {
  userNickname: string;
  setUserNickname: React.Dispatch<React.SetStateAction<string>>;
}
const MyNickname = ({ userNickname, setUserNickname }: Props) => {
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  return (
    <>
      <input
        className={`h-[50px] w-full border border-blue_gray-200 px-[16px] py-[14px] placeholder:text-[16px] placeholder:leading-[22.4px] placeholder:text-blue_gray-500`}
        value={userNickname}
        onChange={handleNicknameChange}
      />
    </>
  );
};

export default MyNickname;
