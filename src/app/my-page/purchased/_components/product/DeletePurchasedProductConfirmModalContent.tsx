const DeletePurchasedProductConfirmModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-custom_black-900">
        이 글을 삭제하시겠어요?
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        삭제한 글은 다시 복구할 수 없어요.
      </p>
    </div>
  );
};

export default DeletePurchasedProductConfirmModalContent;
