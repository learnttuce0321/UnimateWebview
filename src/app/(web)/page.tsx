import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">웹 페이지로 만들 경로입니다.</h1>
      <p className="font-bold ">
        @김승겸 님, 웹뷰 시작경로 <strong>/inapp</strong> 입니다. 참고
        부탁드립니다.
      </p>
      <Link
        href={'/inapp'}
        className="bg-blue-600_P w-[200px] h-[50px] flex items-center justify-center rounded-[15px] mt-[10px] text-white"
      >
        웹뷰 메인페이지 페이지 이동
      </Link>
    </div>
  );
};

export default Page;
