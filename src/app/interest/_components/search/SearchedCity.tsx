'use client';

import { SearchedRegion } from 'types/Region';

interface Props {
  region: SearchedRegion;
  isSelectedRegion: boolean;
  onClick: (region: SearchedRegion) => void;
}

const SearchedCity = ({ region, isSelectedRegion, onClick }: Props) => {
  const { name: regionName, admin1Code: regionAdminCode } = region;
  return (
    <li
      className={`line-clamp-1 flex h-[45px] w-full items-center border-[1px] pl-[16px] text-[16px] ${isSelectedRegion ? 'rounded-[10px] border-blue-600_P bg-blue_gray-50 text-blue-600_P' : 'border-white'}`}
      onClick={() => onClick(region)}
    >
      {`${regionName}, ${regionAdminCode}`}
    </li>
  );
};

export default SearchedCity;
