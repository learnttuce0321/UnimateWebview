interface Props {
  buttonText: string;
  onClick?: (e?: any) => void;
  className?: string;
  isActive?: boolean;
}

const BottomFixedConfirmButton = ({
  buttonText,
  onClick,
  className = '',
  isActive = true,
}: Props) => {
  return (
    <button
      type="button"
      className={`${className} fixed bottom-[16px] left-[16px] h-[50px] w-[calc(100%-32px)] rounded-[10px] text-white ${isActive ? 'bg-blue-600_P' : 'bg-blue_gray-500'}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {buttonText}
    </button>
  );
};

export default BottomFixedConfirmButton;
