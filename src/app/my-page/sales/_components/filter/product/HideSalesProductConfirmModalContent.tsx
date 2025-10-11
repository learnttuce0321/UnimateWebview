const HideSalesProductConfirmModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-custom_black-900 text-[16px] font-bold leading-[22.4px]">
        이 글을 숨기시겠어요?
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        숨김처리 된 글은 다른 메이트에게 비공개처리됩니다.
      </p>
    </div>
  );
};

export default HideSalesProductConfirmModalContent;
