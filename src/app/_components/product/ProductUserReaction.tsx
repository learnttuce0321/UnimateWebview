interface Props {
  likeCount: number;
  chatCount: number;
}
const ProductUserReaction = ({ likeCount, chatCount }: Props) => {
  return (
    <div className="flex w-full justify-end gap-[5px]">
      <span className="flex h-[12px] gap-[3.5px] text-[12px] leading-[12px] text-blue_gray-600">
        <img
          src="/images/svg/home/icon-system-favorite-small.svg"
          alt="좋아요 아이콘"
          width="12"
          height="12"
        />
        14
      </span>
      <span className="flex h-[12px] gap-[3.5px] text-[12px] leading-[12px] text-blue_gray-600">
        <img
          src="/images/svg/home/icon-system-chat.svg"
          alt="채팅 개수 아이콘"
          width="12"
          height="12"
        />
        7
      </span>
    </div>
  );
};

export default ProductUserReaction;
