'use client';

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
      <h3 className="font-bold text-[14px] h-[17px] mb-[16px]">
        나의 관심 도시
      </h3>
      <ul className="flex flex-col gap-[10px]">
        {favoriteCities.map((city) => (
          <SelectedFavoriteCity key={city.id} city={city} />
        ))}
      </ul>
    </>
  );
};

export default SelectedFavoriteCitiesList;
