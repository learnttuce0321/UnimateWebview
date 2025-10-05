'use client';

interface Props {
  onRetry: () => void;
}

const RetryEmailCodeButton = ({ onRetry }: Props) => {
  const handleRetryClick = () => {
    onRetry();
  };

  return (
    <div className="flex w-full items-center justify-center">
      <button
        className="text-[12px] leading-[16.8px] text-blue_gray-600 underline"
        onClick={handleRetryClick}
      >
        인증번호 다시 보내기
      </button>
    </div>
  );
};

export default RetryEmailCodeButton;
