'use client';

import { Suspense } from 'react';
import SelectedInterestRegion from 'app/interest/_components/region/UserInterestRegion';
import { useAppStore } from 'providers/ZustandProvider';

const UserInterestRegionList = () => {
  const userInterestRegions = useAppStore(
    (state) => state.userProfile.interestRegions
  );

  return (
    <>
      <h3 className="mb-[16px] h-[17px] text-[14px] font-bold">
        나의 관심 도시
      </h3>
      <ul className="flex flex-col gap-[10px]">
        <Suspense>
          {userInterestRegions.map((region) => (
            <SelectedInterestRegion key={region.regionId} region={region} />
          ))}
        </Suspense>
      </ul>
    </>
  );
};

export default UserInterestRegionList;
