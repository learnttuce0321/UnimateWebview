interface Props {
  title: string;
}

const LikedProductTitle = ({ title }: Props) => {
  return (
    <h2 className="mb-[6px] text-[16px] font-medium leading-[19.2px] text-blue_gray-900">
      {title}
    </h2>
  );
};

export default LikedProductTitle;
