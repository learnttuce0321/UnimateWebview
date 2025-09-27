import NavigationBar from 'components/navigation/NavigationBar';
import MyPageListSection from '../_components/MyPageListSection';

const Page = () => {
  return (
    <>
      <NavigationBar title="설정" className="bg-white" />
      <div className="h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[16px]">
        <section className="mb-[8px]">
          <MyPageListSection sectionId="PROFILE_SETTING" />
        </section>
        <section>
          <MyPageListSection sectionId="SETTING" />
        </section>
      </div>
    </>
  );
};

export default Page;
