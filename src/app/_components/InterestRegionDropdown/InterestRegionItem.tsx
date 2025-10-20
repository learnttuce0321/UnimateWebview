'use client';

import { Region } from '../../../types/Region';

interface Props {
  region: Region;
  onClick: (cityId: number) => void;
}

const InterestRegionItem = ({
  region: { regionId, regionName, isPrimary },
  onClick,
}: Props) => {
  return (
    <p
      className={`h-[30px] w-full ${isPrimary && 'bg-blue_gray-100'} ${isPrimary ? 'text-blue-600_P' : 'text-blue_gray-600'} px-[26px] text-[14px] leading-[30px] hover:cursor-pointer`}
      onClick={() => onClick(regionId)}
    >
      {regionName}
    </p>
  );
};

export default InterestRegionItem;
