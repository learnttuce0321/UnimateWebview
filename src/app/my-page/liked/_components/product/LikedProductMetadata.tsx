interface Props {
  universityName: string | null;
}

const LikedProductMetadata = ({ universityName }: Props) => {
  if (!universityName) {
    return null;
  }

  return (
    <div className="mb-[6px] flex items-center gap-[2px]">
      <img
        src="/images/svg/my-page/badge-verified.svg"
        width={12}
        height={12}
        alt="대학 인증 마크"
      />
      <p className="text-[12px] leading-[12px] text-blue_gray-600">
        {universityName}
      </p>
    </div>
  );
};

export default LikedProductMetadata;
