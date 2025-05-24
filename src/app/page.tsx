import Link from 'next/link';

export default async function Page() {
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
