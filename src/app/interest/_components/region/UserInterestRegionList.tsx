'use client';

import SelectedInterestRegion from 'app/interest/_components/region/UserInterestRegion';
import { useAppStore } from 'providers/ZustandProvider';

const UserInterestRegionList = () => {
  const userInterestRegions = useAppStore(
    (state) => state.userProfile.interestRegions.interestRegions
  );

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {userInterestRegions.map((region) => (
          <SelectedInterestRegion key={region.regionId} region={region} />
        ))}
      </ul>
    </>
  );
};

export default UserInterestRegionList;
