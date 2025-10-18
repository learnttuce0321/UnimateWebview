import { MouseEvent } from 'react';
import { Popup, usePopup } from 'components/popup';
import MateProfileMoreMenus from './MateProfileMoreMenus';

const MateProfileMore = () => {
  const { popupState, openPopup, closePopup } = usePopup();

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openPopup({
      children: <MateProfileMoreMenus handlePopupClose={closePopup} />,
      position: { right: '8px', top: '25px' },
    });
  };

  return (
    <>
      <button onClick={handleMoreButtonClick}>
        <img
          src="/images/svg/mate/icon-system-more-vertical.svg"
          width={24}
          height={24}
          className="h-[24px] w-[24px]"
          alt="더보기"
        />
      </button>
      <Popup popupState={popupState} onClose={closePopup} />
    </>
  );
};

export default MateProfileMore;
