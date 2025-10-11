import NavigationBar from 'components/navigation/NavigationBar';
import TradingNotificationSection from './_components/TradingNotificationSection';

const Page = () => {
  return (
    <>
      <NavigationBar title="알림 설정" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[30px]">
        <TradingNotificationSection />
      </div>
    </>
  );
};

export default Page;
