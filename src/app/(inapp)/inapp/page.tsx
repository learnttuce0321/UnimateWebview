// import Link from 'next/link';
import HomeHeader from 'app/(inapp)/inapp/_components/layout/HomeHeader';
import ProductList from './_components/product/ProductList';

export default function Page() {
  return (
    <>
      <HomeHeader />
      <ProductList />
    </>
    // <div className="flex justify-center">
    //   <Link
    //     href={'/inapp/register'}
    //     className="bg-blue-600_P w-[200px] h-[50px] flex items-center justify-center rounded-[15px] mt-[10px] text-white"
    //   >
    //     등록하기 페이지 이동
    //   </Link>
    // </div>
  );
}
