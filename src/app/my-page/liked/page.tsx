import NavigationBar from 'components/navigation/NavigationBar';
import LikedProductList from './_components/product/LikedProductList';

const Page = () => {
  return (
    <>
      <NavigationBar title="찜한 목록" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <LikedProductList />
      </div>
    </>
  );
};

export default Page;
