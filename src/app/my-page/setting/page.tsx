import NavigationBar from 'components/navigation/NavigationBar';
import MyPageListSection from '../_components/MyPageListSection';
import AccountActions from './_components/AccountActions';

const Page = () => {
  return (
    <>
      <NavigationBar title="설정" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <section className="mb-[8px]">
          <MyPageListSection sectionId="PROFILE_SETTING" />
        </section>
        <section className="mb-[8px]">
          <MyPageListSection sectionId="SETTING" />
        </section>
        <section>
          <AccountActions />
        </section>
      </div>
    </>
  );
};

export default Page;
