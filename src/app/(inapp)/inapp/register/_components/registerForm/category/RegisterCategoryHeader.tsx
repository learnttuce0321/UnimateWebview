type Props = {
  onClickCategory: () => void;
};

export default function RegisterCategoryHeader({ onClickCategory }: Props) {
  return (
    <div className="flex relative items-center h-[50px] bg-white px-4 border border-gray-200 ">
      <img
        src="/images/svg/icon-arrow-back.svg"
        alt="닫기 버튼"
        onClick={onClickCategory}
        className="w-[24px] mr-auto"
      />
      <h2 className="absolute inset-x-0 pointer-events-none flex justify-center text-[18px] font-bold text-blue_gray-900">
        카테고리
      </h2>
    </div>
  );
}
