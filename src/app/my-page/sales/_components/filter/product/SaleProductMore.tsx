'use client';

import { useState, MouseEvent, useEffect, useRef } from 'react';
import { TradeStatus } from 'types/Product';
import SalesProductMoreMenus from './SalesProductMoreMenus';

interface Props {
  productId: number;
  isHidden: boolean;
  tradeStatus: TradeStatus;
}

const SaleProductMore = ({ productId, isHidden, tradeStatus }: Props) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMoreButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopup]);

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
      {showPopup && (
        <div ref={popupRef} className="absolute right-[8px] top-[36px] z-40">
          <SalesProductMoreMenus
            productId={productId}
            isHidden={isHidden}
            tradeStatus={tradeStatus}
          />
        </div>
      )}
    </>
  );
};

export default SaleProductMore;
