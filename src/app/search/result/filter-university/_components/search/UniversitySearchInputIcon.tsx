import { ActionType } from 'app/interest/_types/search';

interface Props {
  actionType: ActionType;
  onDelete: () => void;
}

const UniversitySearchInputIcon = ({ actionType, onDelete }: Props) => {
  return (
    <span className="absolute right-[32px] top-1/2 h-[20px] -translate-y-1/2">
      {actionType === 'search' ? (
        <button onClick={onDelete}>
          <img
            src="/images/svg/search/icon-system-close-circle.svg"
            alt="삭제"
            width="20"
            height="20"
          />
        </button>
      ) : (
        <img
          src="/images/svg/search/icon-system-search-gray.svg"
          alt="검색"
          width="20"
          height="20"
        />
      )}
    </span>
  );
};

export default UniversitySearchInputIcon;
