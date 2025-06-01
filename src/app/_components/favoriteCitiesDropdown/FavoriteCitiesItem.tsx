'use client';

import { useSearchParams } from 'next/navigation';
import { normalizeString } from 'modules/normalize';

interface Props {
  city: { id: string; name: string };
  onClick: (cityId: string) => void;
}

const FavoriteCitiesItem = ({ city, onClick }: Props) => {
  const searchParams = useSearchParams();
  const cityId = searchParams.get('cityId');

  const isActive = city.id === normalizeString(cityId);

  return (
    <p
      className={`w-full h-[30px] ${isActive && 'bg-blue_gray-100'} ${isActive ? 'text-blue-600_P' : 'text-blue_gray-600'} px-[26px] text-[14px] leading-[30px] hover:cursor-pointer`}
      onClick={() => onClick(city.id)}
    >
      {city.name}
    </p>
  );
};

export default FavoriteCitiesItem;
