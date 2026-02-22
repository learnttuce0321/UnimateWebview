'use client';

import navigationScheme from '../../utils/navigationScheme';

interface Props {
  className: HTMLButtonElement['className'];
  onClick?: () => void;
  children?: React.ReactNode;
}

const BackButton = ({ className, onClick, children }: Props) => {
  const { closeWeb } = navigationScheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      closeWeb();
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
