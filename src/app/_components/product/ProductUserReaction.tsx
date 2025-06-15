interface Props {
  likeCount: number;
  chatCount: number;
}
const ProductUserReaction = ({ likeCount, chatCount }: Props) => {
  return (
    <div className="flex justify-end w-full gap-[5px]">
      <span className="text-blue_gray-600 h-[12px] text-[12px] leading-[12px] flex gap-[3.5px]">
        <img
          src="/images/svg/home/icon-system-favorite-small.svg"
          alt="좋아요 아이콘"
          width="12"
          height="12"
        />
        14
      </span>
      <span className="text-blue_gray-600 h-[12px] text-[12px] leading-[12px] flex gap-[3.5px]">
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
