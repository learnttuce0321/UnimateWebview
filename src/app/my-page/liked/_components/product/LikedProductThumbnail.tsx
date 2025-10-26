interface Props {
  title: string;
  thumbnailUrl: string;
}

const LikedProductThumbnail = ({ title, thumbnailUrl }: Props) => {
  return (
    <img
      className="h-[72px] w-[72px] rounded-[8px] object-cover"
      src={thumbnailUrl}
      alt={`${title} 이미지`}
      width={72}
      height={72}
    />
  );
};

export default LikedProductThumbnail;
