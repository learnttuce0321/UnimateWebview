type Props = {
  onClickCategory: () => void;
};

export default function RegisterCategoryHeader({ onClickCategory }: Props) {
  return (
    <div className="relative flex h-[50px] items-center border border-t-0 border-gray-200 bg-white px-4">
      <img
        src="/images/svg/register/icon-arrow-back.svg"
        alt="닫기 버튼"
        onClick={onClickCategory}
        className="mr-auto w-[24px]"
      />
      <h2 className="pointer-events-none absolute inset-x-0 flex justify-center text-[18px] font-bold text-blue_gray-900">
        카테고리
      </h2>
    </div>
  );
}
