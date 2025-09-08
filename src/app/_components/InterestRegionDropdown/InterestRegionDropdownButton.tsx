'use client';

import { useState } from 'react';
import {
  MAIN_PAGE_ADD_USER_INTEREST_REGION,
  MAIN_PAGE_DELETE_USER_INTEREST_REGION,
} from 'constants/storageSync';
import { useStorageSync } from 'hooks/useStorageSync';
import { useAppStore } from 'providers/ZustandProvider';
import InterestRegionDropdown from './InterestRegionDropdown';

const InterestRegionDropdownButton = () => {
  const [openInterestRegionDropdown, setOpenInterestRegionDropdown] =
    useState<boolean>(false);
  const getPrimaryRegion = useAppStore((state) => state.getPrimaryRegion);
  const addInterestRegion = useAppStore((state) => state.addInterestRegion);
  const removeInterestRegion = useAppStore(
    (state) => state.removeInterestRegion
  );

  useStorageSync(MAIN_PAGE_ADD_USER_INTEREST_REGION, (newValue) => {
    const { regionId, regionName, isPrimary } = newValue as Record<string, any>;
    addInterestRegion({ regionId, regionName, isPrimary });
  });

  useStorageSync(MAIN_PAGE_DELETE_USER_INTEREST_REGION, (newValue) => {
    const { regionId } = newValue as Record<string, any>;
    removeInterestRegion(regionId);
  });

  return (
    <div className="relative">
      <div
        className="text-900 flex gap-[8px] text-[24px] font-bold"
        onClick={() => setOpenInterestRegionDropdown(true)}
      >
        <p>{getPrimaryRegion()?.regionName ?? ''}</p>
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
