'use client';

import { useState } from 'react';
import NavigationBar from 'components/navigation/NavigationBar';
import { useAppStore } from 'providers/ZustandProvider';
import EmailCodeInput from './_components/code/EmailCodeInput';
import EmailCodeSubDescription from './_components/code/EmailCodeSubDescription';
import FinishVerifyUniversityButton from './_components/complete/FinishVerifyUniversityButton';
import VerifyEmailCompleteDescription from './_components/complete/VerifyEmailCompleteDescription';
import UniversityEmailInput from './_components/email/UniversityEmailInput';
import VerifyUniversityDescription from './_components/email/VerifyUniversityDescription';
import VerifyUniversitySubDescription from './_components/email/VerifyUniversitySubDescription';
import CheckVerifiedUniversityEmailButton from '../verified/_components/CheckVerifiedUniversityEmailButton';
import VerifiedUniversityDescription from '../verified/_components/VerifiedUniversityDescription';
import VerifiedUniversityEmail from '../verified/_components/VerifiedUniversityEmail';

export type VerifyType = 'EMAIL' | 'CODE' | 'COMPLETE' | 'VERIFIED';
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
  VERIFIED: () => (
    <>
      <VerifiedUniversityDescription />
      <VerifiedUniversityEmail />
      <CheckVerifiedUniversityEmailButton />
    </>
  ),
};

const Page = () => {
  const university = useAppStore((state) => state.userProfile.university);
  const [verifyType, setVerifyType] = useState<VerifyType>(
    university.name ? 'VERIFIED' : 'EMAIL'
  );

  const VerifyComponent = VerifyComponentsByStep[verifyType];

  return (
    <>
      <NavigationBar title="학교 인증하기" className="bg-white" />
      <div className="min-h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[24px]">
        <VerifyComponent setVerifyType={setVerifyType} />
      </div>
    </>
  );
};

export default Page;
