import NavigationBar from 'components/navigation/NavigationBar';
import BlockedMateList from './_components/mate/BlockedMateList';

const Page = () => {
  return (
    <>
      <NavigationBar title="차단 목록" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <BlockedMateList />
      </div>
    </>
  );
};

export default Page;
