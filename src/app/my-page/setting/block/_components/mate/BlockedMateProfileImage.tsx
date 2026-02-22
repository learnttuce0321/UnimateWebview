interface Props {
  nickname: string;
  profileImageUrl: string;
}

const BlockedMateProfileImage = ({ nickname, profileImageUrl }: Props) => {
  return (
    <div className="h-[40px] w-[40px]">
      <img
        className="rounded-full"
        src={profileImageUrl}
        width={40}
        height={40}
        alt={`${nickname} 프로필`}
      />
    </div>
  );
};

export default BlockedMateProfileImage;
