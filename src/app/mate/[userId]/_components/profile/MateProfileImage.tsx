interface Props {
  nickname: string;
  profileImageUrl: string;
}

const MateProfileImage = ({ nickname, profileImageUrl }: Props) => {
  return (
    <div className="h-[96px] w-[96px]">
      <img
        src={profileImageUrl}
        className="h-[96px] w-[96px]"
        width={96}
        height={96}
        alt={`${nickname}의 프로필`}
      />
    </div>
  );
};

export default MateProfileImage;
