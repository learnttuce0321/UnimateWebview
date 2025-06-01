import Link from 'next/link';

export default function Page() {
  // 등록하기 개발후 테섭 배포하고 기획분들이 확인하기 편하게 Link로 우선 이동하도록 변경
  return (
    <div className="flex justify-center">
      <Link
        href={'/register'}
        className="bg-blue-600_P w-[200px] h-[50px] flex items-center justify-center rounded-[15px] mt-[10px] text-white"
      >
        등록하기 페이지 이동
      </Link>
    </div>
  );
}
