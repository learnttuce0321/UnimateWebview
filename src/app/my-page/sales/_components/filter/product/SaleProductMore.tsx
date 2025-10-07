'use client';

import { useState, MouseEvent, useEffect, useRef } from 'react';
import SalesProductMoreMenus from './SalesProductMoreMenus';

const SaleProductMore = () => {
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
          <SalesProductMoreMenus />
        </div>
      )}
    </>
  );
};

export default SaleProductMore;
