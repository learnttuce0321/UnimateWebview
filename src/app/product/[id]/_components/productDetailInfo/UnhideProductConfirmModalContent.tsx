const UnhideProductConfirmModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-black-900">
        이 글을 공개하시겠어요?
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        글을 공개하면 다른 메이트가 게시글을 볼 수 있습니다.
      </p>
    </div>
  );
};

export default UnhideProductConfirmModalContent;
