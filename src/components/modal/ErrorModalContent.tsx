interface Props {
  errorMessage: string;
}

const ErrorModalContent = ({ errorMessage }: Props) => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-custom_black-900">
        오류가 발생했습니다
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorModalContent;
