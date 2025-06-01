interface Props {
  isInputFocused: boolean;
  onDelete: () => void;
}

const SearchInputIcon = ({ isInputFocused, onDelete }: Props) => {
  return (
    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 h-[20px]">
      {isInputFocused ? (
        <button>
          <img
            src="/images/svg/favorite/icon-system-close-circle.svg"
            alt="삭제"
            width="20"
            height="20"
            onClick={onDelete}
          />
        </button>
      ) : (
        <img
          src="/images/svg/favorite/icon-system-search-gray.svg"
          alt="검색"
          width="20"
          height="20"
        />
      )}
    </span>
  );
};

export default SearchInputIcon;
