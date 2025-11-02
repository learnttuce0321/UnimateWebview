'use client';

import { MouseEvent } from 'react';
import { Popup, usePopup } from 'components/popup';
import { TradeStatus } from 'types/Product';
import SalesProductMoreMenus from './SalesProductMoreMenus';

interface Props {
  productId: number;
  isHidden: boolean;
  tradeStatus: TradeStatus;
}

const SalesProductMore = ({ productId, isHidden, tradeStatus }: Props) => {
  const { popupState, openPopup, closePopup } = usePopup();

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openPopup({
      children: (
        <SalesProductMoreMenus
          productId={productId}
          isHidden={isHidden}
          tradeStatus={tradeStatus}
          handlePopupClose={closePopup}
        />
      ),
      position: { right: '12px', top: '32px' },
    });
  };

  return (
    <>
      <button
        className="absolute right-[8px] top-[8px]"
        onClick={handleMoreButtonClick}
      >
        <img
          src="/images/svg/my-page/icon-system-more-vertical.svg"
          width={24}
          height={24}
          alt="더보기"
        />
      </button>
      <Popup popupState={popupState} onClose={closePopup} />
    </>
  );
};

export default SalesProductMore;
