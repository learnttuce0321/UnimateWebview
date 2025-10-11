import NavigationBar from 'components/navigation/NavigationBar';
import MyNickname from '../_components/profile/MyNickname';
import MyProfileImage from '../_components/profile/MyProfileImage';

const Page = () => {
  return (
    <>
      <NavigationBar title="프로필 설정" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <div className="flex h-[188px] w-full items-center justify-center">
          <MyProfileImage />
        </div>
        <MyNickname />
      </div>
    </>
  );
};

export default Page;
