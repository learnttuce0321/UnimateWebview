interface Props {
  likeCount: number;
  chatRoomCount: number;
}

const SearchedProductUserReaction = ({ likeCount, chatRoomCount }: Props) => {
  return (
    <div className="flex w-full justify-end gap-[5px]">
      <span className="flex h-[12px] gap-[3.5px] text-[12px] leading-[12px] text-blue_gray-600">
        <img
          src="/images/svg/search/icon-system-favorite-small.svg"
          alt="좋아요 아이콘"
          width="12"
          height="12"
        />
        {likeCount}
      </span>
      <span className="flex h-[12px] gap-[3.5px] text-[12px] leading-[12px] text-blue_gray-600">
        <img
          src="/images/svg/search/icon-system-chat.svg"
          alt="채팅 개수 아이콘"
          width="12"
          height="12"
        />
        {chatRoomCount}
      </span>
    </div>
  );
};

export default SearchedProductUserReaction;
