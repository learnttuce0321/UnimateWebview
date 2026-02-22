const UnblockMateConfirmModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-custom_black-900">
        차단을 해제하시겠어요?
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        차단을 해제하면 게시글이나, 채팅을 확인할 수 있어요.
      </p>
    </div>
  );
};

export default UnblockMateConfirmModalContent;
