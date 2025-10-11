'use client';

import { useState } from 'react';
import { useAppStore } from 'providers/ZustandProvider';
import { selectPrimaryRegion } from 'stores/selectors';
import InterestRegionDropdown from './InterestRegionDropdown';

const InterestRegionDropdownButton = () => {
  const [openInterestRegionDropdown, setOpenInterestRegionDropdown] =
    useState<boolean>(false);
  const primaryRegion = useAppStore(selectPrimaryRegion);

  return (
    <div className="relative">
      <div
        className="text-900 flex gap-[8px] text-[24px] font-bold"
        onClick={() => setOpenInterestRegionDropdown(true)}
      >
        <p>{primaryRegion?.regionName ?? ''}</p>
        <img
          src="/images/svg/home/icon-arrow-chevron-down.svg"
          alt="관심 도시 설정 아이콘"
          width="24"
          height="24"
        />
      </div>

      {openInterestRegionDropdown && (
        <InterestRegionDropdown
          onClose={() => setOpenInterestRegionDropdown(false)}
        />
      )}
    </div>
  );
};

export default InterestRegionDropdownButton;
