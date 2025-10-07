interface Props {
  onClick: () => void;
}

const SalesListFilterConfirmButton = ({ onClick }: Props) => {
  return (
    <button
      className="mb-[10px] flex h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-white"
      onClick={onClick}
    >
      확인
    </button>
  );
};
export default SalesListFilterConfirmButton;
