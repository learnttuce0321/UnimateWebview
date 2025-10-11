'use client';

import { ChangeEvent, useState } from 'react';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import EmailInputWarning from './EmailInputWarning';
import InvalidEmailWarning from './InvalidEmailWarning';
import { VerifyType } from '../../page';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Props {
  setVerifyType: React.Dispatch<React.SetStateAction<VerifyType>>;
  inputUniversityEmail: string;
  setInputUniversityEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSendEmailCode: (onSuccess: () => void) => void;
}

const UniversityEmailInput = ({
  setVerifyType,
  inputUniversityEmail,
  setInputUniversityEmail,
  handleSendEmailCode,
}: Props) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputUniversityEmail(e.target.value);
  };

  const handleConfirmEmailClick = () => {
    if (!emailPattern.test(inputUniversityEmail)) {
      setIsValid(false);
      return;
    }

    handleSendEmailCode(() => setVerifyType('CODE'));
  };

  return (
    <>
      <input
        className={`h-[50px] w-full border border-blue_gray-200 px-[16px] py-[14px] leading-[22.4px] placeholder:text-[16px] placeholder:leading-[22.4px] placeholder:text-blue_gray-500 ${!isValid ? 'border-tomato_red placeholder:text-tomato_red' : ''}`}
        value={inputUniversityEmail}
        onChange={handleEmailChange}
        placeholder="example@email.com"
      />
      {!isValid ? <InvalidEmailWarning /> : <EmailInputWarning />}
      <BottomFixedConfirmButton
        buttonText="인증코드 보내기"
        onClick={handleConfirmEmailClick}
        isActive={!!inputUniversityEmail}
      />
    </>
  );
};

export default UniversityEmailInput;
