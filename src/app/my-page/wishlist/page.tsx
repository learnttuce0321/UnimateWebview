import NavigationBar from 'components/navigation/NavigationBar';
import Wishlist from './_components/product/Wishlist';

const Page = () => {
  return (
    <>
      <NavigationBar title="찜한 목록" />
      <div className="h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[16px]">
        <Wishlist />
      </div>
    </>
  );
};

export default Page;
