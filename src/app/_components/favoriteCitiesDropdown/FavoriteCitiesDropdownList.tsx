'use client';
import { useRouter } from 'next/navigation';
import FavoriteCitiesItem from 'app/_components/favoriteCitiesDropdown/FavoriteCitiesItem';

interface Props {
  onClose: () => void;
}

const FavoriteCitiesDropdownList = ({ onClose }: Props) => {
  const router = useRouter();
  // TODO: Zustand
  const favoriteCities = [
    { id: '1', name: 'san' },
    { id: '2', name: 'san' },
    { id: '3', name: 'san' },
  ];

  const handleCityClick = (cityId: string) => {
    router.push(`/?cityId=${cityId}`);
    onClose();
  };

  const handleSetFavoriteCityClick = () => {
    router.push('/favorite');
  };

  return (
    <div className="absolute z-[11] ">
      <div className="w-[163px] rounded-[10px] bg-white py-[8px]">
        {favoriteCities.map((city) => (
          <FavoriteCitiesItem
            key={city.id}
            city={city}
            onClick={handleCityClick}
          />
        ))}
        <p
          className="w-full h-[30px] text-blue_gray-600 px-[26px] text-[14px] leading-[30px] hover:cursor-pointer"
          onClick={handleSetFavoriteCityClick}
        >
          관심 도시 설정
        </p>
      </div>
    </div>
  );
};
export default FavoriteCitiesDropdownList;
