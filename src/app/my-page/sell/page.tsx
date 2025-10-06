import NavigationBar from 'components/navigation/NavigationBar';
import SellListFilterBottomSheetButton from './_components/filter/SellListFilterBottomSheetButton';

const Page = () => {
  return (
    <>
      <NavigationBar title="판매 내역" />
      <div className="relative h-[calc(100vh-50px)] w-full bg-gray-50 pt-[16px]">
        <SellListFilterBottomSheetButton />
      </div>
    </>
  );
};

export default Page;
