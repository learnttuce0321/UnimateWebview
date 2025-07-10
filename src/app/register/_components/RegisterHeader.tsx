'use client';

import { useRouter } from 'next/navigation';

export default function RegisterHeader() {
  const router = useRouter();

  const handleClickCloseButton = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 flex h-[50px] items-center bg-white px-4">
      <h2 className="pointer-events-none absolute inset-x-0 flex justify-center text-[18px] font-bold text-blue_gray-900">
        물건 등록하기
      </h2>
      <img
        src="/images/svg/register/icon-system-close.svg"
        alt="닫기 버튼"
        onClick={handleClickCloseButton}
        className="ml-auto w-[24px] cursor-pointer"
      />
    </div>
  );
}
