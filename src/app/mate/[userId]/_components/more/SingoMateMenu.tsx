interface Props {
  handleSingoMateClick?: () => void;
}

const SingoMateMenu = ({ handleSingoMateClick }: Props) => {
  return (
    <>
      <p className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600">
        <button
          className="w-full h-full text-left"
          onClick={handleSingoMateClick}
        >
          신고하기
        </button>
      </p>
    </>
  );
};

export default SingoMateMenu;
