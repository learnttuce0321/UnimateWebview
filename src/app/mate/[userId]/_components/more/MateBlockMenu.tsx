interface Props {
  handleBlockMateClick: () => void;
}

const MateBlockMenu = ({ handleBlockMateClick }: Props) => {
  return (
    <>
      <p className="flex h-[30px] w-full items-center px-[16px] text-blue_gray-600">
        <button
          className="h-full w-full text-left"
          onClick={handleBlockMateClick}
        >
          차단하기
        </button>
      </p>
    </>
  );
};

export default MateBlockMenu;
