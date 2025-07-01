'use client';

import { Suspense } from 'react';
import SelectedFavoriteCity from 'app/favorite/_components/favoriteCities/SelectedFavoriteCity';

const SelectedFavoriteCitiesList = () => {
  // TODO: Zustand
  const favoriteCities = [
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
          {favoriteCities.map((city) => (
            <SelectedFavoriteCity key={city.id} city={city} />
          ))}
        </Suspense>
      </ul>
    </>
  );
};

export default SelectedFavoriteCitiesList;
