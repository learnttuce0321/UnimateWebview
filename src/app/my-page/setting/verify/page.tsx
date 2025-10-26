'use client';

import { useState } from 'react';
import NavigationBar from 'components/navigation/NavigationBar';
import { Toast, useToast } from 'components/toast';
import { useMutationSendEmailCode } from 'hooks/university/useMutationSendEmailCode';
import { useMutationVerifyEmailCode } from 'hooks/university/useMutationVerifyEmailCode';
import { ApiResponseError } from 'modules/fetch/fetchClient';
import { useAppStore } from 'providers/ZustandProvider';
import EmailCodeInput from './_components/code/EmailCodeInput';
import EmailCodeSubDescription from './_components/code/EmailCodeSubDescription';
import FinishVerifyUniversityButton from './_components/complete/FinishVerifyUniversityButton';
import VerifyEmailCompleteDescription from './_components/complete/VerifyEmailCompleteDescription';
import CheckVerifiedUniversityEmailButton from './_components/email/CheckVerifiedUniversityEmailButton';
import UniversityEmailInput from './_components/email/UniversityEmailInput';
import VerifiedUniversityDescription from './_components/email/VerifiedUniversityDescription';
import VerifiedUniversityEmail from './_components/email/VerifiedUniversityEmail';
import VerifyUniversityDescription from './_components/email/VerifyUniversityDescription';
import VerifyUniversitySubDescription from './_components/email/VerifyUniversitySubDescription';

export type VerifyType = 'EMAIL' | 'CODE' | 'COMPLETE' | 'VERIFIED';
interface VerifyStepProps {
  setVerifyType: React.Dispatch<React.SetStateAction<VerifyType>>;
  handleError: (error: ApiResponseError) => void;
  inputUniversityEmail: string;
  setInputUniversityEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSendEmailCode: (onSuccess: () => void) => void;
  handleVerifyEmailCode: (code: string) => void;
}

const VerifyComponentsByStep = {
  EMAIL: ({
    setVerifyType,
    inputUniversityEmail,
    setInputUniversityEmail,
    handleSendEmailCode,
  }: VerifyStepProps) => (
    <>
      <VerifyUniversityDescription />
      <VerifyUniversitySubDescription />
      <UniversityEmailInput
        setVerifyType={setVerifyType}
        inputUniversityEmail={inputUniversityEmail}
        setInputUniversityEmail={setInputUniversityEmail}
        handleSendEmailCode={handleSendEmailCode}
      />
    </>
  ),
  CODE: ({ handleSendEmailCode, handleVerifyEmailCode }: VerifyStepProps) => (
    <>
      <VerifyUniversityDescription />
      <EmailCodeSubDescription />
      <EmailCodeInput
        handleSendEmailCode={handleSendEmailCode}
        handleVerifyEmailCode={handleVerifyEmailCode}
      />
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
    university?.name ? 'VERIFIED' : 'EMAIL'
  );
  const { toast, showToast, hideToast } = useToast();
  const [inputUniversityEmail, setInputUniversityEmail] = useState<string>('');

  const { mutate: mutateSendEmailCode } = useMutationSendEmailCode();
  const { mutate: mutateVerifyEmailCode } = useMutationVerifyEmailCode();

  const handleError = (error: ApiResponseError) => {
    showToast(error.message, 'error');
  };

  const handleSendEmailCode = (onSuccess: () => void) => {
    mutateSendEmailCode(
      {
        email: inputUniversityEmail,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  const handleVerifyEmailCode = (code: string) => {
    mutateVerifyEmailCode(
      {
        code,
      },
      {
        onSuccess: () => {
          setVerifyType('COMPLETE');
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  const VerifyComponent = VerifyComponentsByStep[verifyType];

  return (
    <>
      <NavigationBar title="학교 인증하기" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[24px]">
        <VerifyComponent
          setVerifyType={setVerifyType}
          handleError={handleError}
          handleSendEmailCode={handleSendEmailCode}
          handleVerifyEmailCode={handleVerifyEmailCode}
          inputUniversityEmail={inputUniversityEmail}
          setInputUniversityEmail={setInputUniversityEmail}
        />
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default Page;
