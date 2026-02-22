'use client';

import { getDisplayRegionName } from 'utils/getDisplayRegionName';
import { Region } from '../../../types/Region';

interface Props {
  region: Region;
  onClick: (cityId: number) => void;
}

const InterestRegionItem = ({ region, onClick }: Props) => {
  const { regionId, isPrimary } = region;
  return (
    <p
      className={`h-[30px] w-full ${isPrimary && 'bg-blue_gray-100'} ${isPrimary ? 'text-blue-600_P' : 'text-blue_gray-600'} line-clamp-1 px-[26px] text-[14px] leading-[30px] hover:cursor-pointer`}
      onClick={() => onClick(regionId)}
    >
      {getDisplayRegionName(region)}
    </p>
  );
};

export default InterestRegionItem;
