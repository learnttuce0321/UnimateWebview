'use client';

import { Suspense } from 'react';
import SelectedInterestRegion from 'app/interest/_components/region/SelectedInterestRegion';

const SelectedInterestRegionList = () => {
  // TODO: Zustand
  const InterestRegion = [
    { id: '1', name: 'san' },
    { id: '2', name: 'san' },
    { id: '3', name: 'san' },
  ];

  return (
    <>
      <h3 className="mb-[16px] h-[17px] text-[14px] font-bold">
        나의 관심 도시
      </h3>
      <ul className="flex flex-col gap-[10px]">
        <Suspense>
          {InterestRegion.map((city) => (
            <SelectedInterestRegion key={city.id} city={city} />
          ))}
        </Suspense>
      </ul>
    </>
  );
};

export default SelectedInterestRegionList;
