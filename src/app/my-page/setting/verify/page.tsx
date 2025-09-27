'use client';

import { useState } from 'react';
import NavigationBar from 'components/navigation/NavigationBar';
import UniversityEmailInput from './_components/email/UniversityEmailInput';
import VerifyUniversityDescription from './_components/email/VerifyUniversityDescription';
import VerifyUniversitySubDescription from './_components/email/VerifyUniversitySubDescription';
import EmailCodeSubDescription from './_components/code/EmailCodeSubDescription';
import EmailCodeInput from './_components/code/EmailCodeInput';
import VerifyEmailCompleteDescription from './_components/complete/VerifyEmailCompleteDescription';
import FinishVerifyUniversityButton from './_components/complete/FinishVerifyUniversityButton';

export type VerifyType = 'EMAIL' | 'CODE' | 'COMPLETE';
interface VerifyStepProps {
  setVerifyType: React.Dispatch<React.SetStateAction<VerifyType>>;
}

const VerifyComponentsByStep = {
  EMAIL: ({ setVerifyType }: VerifyStepProps) => (
    <>
      <VerifyUniversityDescription />
      <VerifyUniversitySubDescription />
      <UniversityEmailInput setVerifyType={setVerifyType} />
    </>
  ),
  CODE: ({ setVerifyType }: VerifyStepProps) => (
    <>
      <VerifyUniversityDescription />
      <EmailCodeSubDescription />
      <EmailCodeInput setVerifyType={setVerifyType} />
    </>
  ),
  COMPLETE: () => (
    <>
      <VerifyEmailCompleteDescription />
      <FinishVerifyUniversityButton />
    </>
  ),
};

const Page = () => {
  const [verifyType, setVerifyType] = useState<VerifyType>('EMAIL');

  const VerifyComponent = VerifyComponentsByStep[verifyType];

  return (
    <>
      <NavigationBar title="학교 인증하기" className="bg-white" />
      <div className="h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[24px]">
        <VerifyComponent setVerifyType={setVerifyType} />
      </div>
    </>
  );
};

export default Page;
