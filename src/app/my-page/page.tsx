import NavigationBar from 'components/navigation/NavigationBar';
import MyPageListSection from './_components/MyPageListSection';
import ProfileSettingButton from './_components/navigation/ProfileSettingButton';
import MyProfile from './_components/profile/MyProfile';

const Page = () => {
  return (
    <>
      <NavigationBar
        title="프로필"
        showBackButton={false}
        renderOptionButtons={<ProfileSettingButton />}
        className="bg-white"
      />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <MyProfile />
        <section className="mb-[8px]">
          <MyPageListSection sectionId="TRADING" />
        </section>
        {/* <section className="mb-[8px]">
          <MyPageListSection sectionId="COMMUNITY" />
        </section> */}
      </div>
    </>
  );
};

export default Page;
