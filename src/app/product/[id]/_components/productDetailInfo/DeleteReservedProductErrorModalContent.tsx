const DeleteReservedProductErrorModalContent = () => {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="text-[16px] font-bold leading-[22.4px] text-custom_black-900">
        예약중인 글은 삭제할 수 없어요.
      </p>
      <p className="text-[14px] font-medium leading-[16.8px] text-blue_gray-700">
        판매상태를 변경한 후 다시 시도해주세요.
      </p>
    </div>
  );
};

export default DeleteReservedProductErrorModalContent;
