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
      className={`w-full h-[45px] line-clamp-1 text-[16px] pl-[16px] flex items-center border-[1px] ${currentSelectedCityId === city.id ? 'border-blue-600_P rounded-[10px] bg-blue_gray-50 text-blue-600_P' : 'border-white'}`}
      onClick={() => onClick(city)}
    >
      {city.name}
    </li>
  );
};

export default SearchedCity;
