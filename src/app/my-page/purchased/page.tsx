import NavigationBar from 'components/navigation/NavigationBar';
import PurchasedProductList from './_components/product/PurchasedProductList';

const Page = () => {
  return (
    <>
      <NavigationBar title="구매내역" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <PurchasedProductList />
      </div>
    </>
  );
};

export default Page;
