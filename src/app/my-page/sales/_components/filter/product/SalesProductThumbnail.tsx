interface Props {
  title: string;
  thumbnailUrl: string;
  isHidden: boolean;
}

const SalesProductThumbnail = ({ title, thumbnailUrl, isHidden }: Props) => {
  return (
    <div className="relative h-[108px] w-[108px]">
      <img
        className="h-full w-full rounded-lg"
        src={thumbnailUrl}
        width={108}
        height={108}
        alt={`${title} 썸네일`}
      />
      {isHidden && (
        <div className="bg-black/40 absolute inset-0 flex items-center justify-center rounded-lg text-[10px] leading-[12px] text-white">
          숨겨진 글
        </div>
      )}
    </div>
  );
};
export default SalesProductThumbnail;
