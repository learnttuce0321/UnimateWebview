'use client';

interface Props {
  className: HTMLButtonElement['className'];
  onClick?: () => void;
  children?: React.ReactNode;
}

const BackButton = ({ className, onClick, children }: Props) => {
  // const {closeWeb} = useScheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // closeWeb()
      window.history.back();
    }
  };

  return (
    <button className={`${className}`} onClick={handleClick}>
      {children ? (
        <>{children}</>
      ) : (
        <img
          src="/images/svg/default/icon-arrow-back.svg"
          alt="뒤로가기"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};

export default BackButton;
