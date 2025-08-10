'use client';

interface Props {
  city: {
    id: string;
    name: string;
  };
  currentSelectedCityId: string | undefined;
  onClick: (cityId: { id: string; name: string }) => void;
}

const SearchedCity = ({ city, currentSelectedCityId, onClick }: Props) => {
  return (
    <li
      className={`line-clamp-1 flex h-[45px] w-full items-center border-[1px] pl-[16px] text-[16px] ${currentSelectedCityId === city.id ? 'rounded-[10px] border-blue-600_P bg-blue_gray-50 text-blue-600_P' : 'border-white'}`}
      onClick={() => onClick(city)}
    >
      {city.name}
    </li>
  );
};

export default SearchedCity;
