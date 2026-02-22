const ScreenError = () => {
  return (
    <div className="flex min-h-full_without_navigation flex-col items-center justify-center bg-gray-50">
      <img
        src="/images/svg/default/error.svg"
        width={72}
        height={72}
        alt="에러"
      />
      <p className="mt-2 text-[16px] font-semibold leading-[24px] text-blue_gray-700">
        오류가 발생했습니다.
      </p>
      <p className="text-[14px] font-normal leading-[21px] text-blue_gray-700">
        잠시후 다시 시도해주세요.
      </p>
    </div>
  );
};

export default ScreenError;
