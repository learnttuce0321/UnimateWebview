const BlockMateConfirmModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-custom_black-900">
        이 메이트를 차단하시겠어요?
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        차단하면 서로의 게시글을 확인할 수 없고, 새로운 채팅을 주고 받을 수
        없어요.
      </p>
    </div>
  );
};

export default BlockMateConfirmModalContent;
