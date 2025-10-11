'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import Timer from 'components/timer/Timer';
import { useTimer } from 'components/timer/useTimer';
import { Toast, useToast } from 'components/toast';
import RetryEmailCodeButton from './RetryEmailCodeButton';

interface Props {
  handleSendEmailCode: (onSuccess: () => void) => void;
  handleVerifyEmailCode: (code: string) => void;
}

const EmailCodeInput = ({
  handleSendEmailCode,
  handleVerifyEmailCode,
}: Props) => {
  const [_code, setCode] = useState<string>('');
  const { formattedTime, resetTimer } = useTimer(600);
  const { toast, showToast, hideToast } = useToast();

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleRetryCodeClick = () => {
    handleSendEmailCode(() => {
      resetTimer();
      showToast('인증코드를 발송했어요', 'info', 2000);
    });
  };

  useEffect(() => {
    showToast('인증코드를 발송했어요', 'info', 2000);
  }, [showToast]);

  return (
    <>
      <div className="relative">
        <input
          className={`mb-[8px] h-[50px] w-full border border-blue_gray-200 px-[16px] py-[14px] pr-[80px] leading-[22.4px] placeholder:text-[16px] placeholder:leading-[22.4px] placeholder:text-blue_gray-500`}
          value={_code}
          onChange={handleCodeChange}
          placeholder="000000"
        />
        <Timer formattedTime={formattedTime} />
      </div>
      <RetryEmailCodeButton onRetry={handleRetryCodeClick} />
      <BottomFixedConfirmButton
        buttonText="인증하기"
        onClick={handleVerifyEmailCode}
        isActive={_code.length === 6}
      />
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

export default EmailCodeInput;
