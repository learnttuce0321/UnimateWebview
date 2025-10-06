import ProfileImage from './ProfileImage';
import ProfileMetaData from './ProfileMetaData';
import ProfileName from './ProfileName';

const MyProfile = () => {
  return (
    <div className="mb-[16px] flex h-[128px] w-full gap-[22px] rounded-[10px] bg-white px-[16px] py-[16px] shadow-[0_0_10px_rgba(0,0,0,0.05)]">
      <ProfileImage />
      <div className="flex flex-col gap-[16px]">
        <ProfileName />
        <div className="flex flex-col gap-[9px]">
          <ProfileMetaData />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
