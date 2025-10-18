const SuccessBlockMateModalContent = () => {
  return (
    <div className="flex flex-col items-start w-full gap-2">
      <p className="text-custom_black-900 text-[16px] font-bold leading-[22.4px]">
        이 메이트를 차단했어요.
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        {`채팅방 > 설정에서 언제든 다시 차단을 풀 수 있어요.`}
      </p>
    </div>
  );
};

export default SuccessBlockMateModalContent;
