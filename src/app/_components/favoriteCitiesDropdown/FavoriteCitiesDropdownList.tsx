'use client';

import FavoriteCitiesItem from 'app/_components/favoriteCitiesDropdown/FavoriteCitiesItem';
import { useMutationChangePrimaryRegion } from 'app/_hooks/useMutationChangePrimaryRegion';
import { useAppStore } from '../../../stores';
import navigationScheme from '../../../utils/navigationScheme';

interface Props {
  onClose: () => void;
}

const FavoriteCitiesDropdownList = ({ onClose }: Props) => {
  const { openWeb } = navigationScheme();
  const { mutate } = useMutationChangePrimaryRegion();

  const userInterestRegions = useAppStore((state) => state.userInterestRegions);
  const changePrimaryRegion = useAppStore((state) => state.changePrimaryRegion);

  const handleCityClick = (selectedCityId: string, regionPrimary: boolean) => {
    if (regionPrimary) {
      return onClose();
    }

    mutate(
      { regionId: selectedCityId },
      {
        onSettled: () => {
          changePrimaryRegion(selectedCityId);
          onClose();
        },
      }
    );
  };

  const handleSetFavoriteCityClick = () => {
    openWeb(`/favorite`);
  };

  return (
    <div className="absolute z-[11]">
      <div className="w-[163px] rounded-[10px] bg-white py-[8px]">
        {userInterestRegions.map((region) => (
          <FavoriteCitiesItem
            key={region.regionId}
            region={region}
            onClick={() => handleCityClick(region.regionId, region.isPrimary)}
          />
        ))}
        <p
          className="h-[30px] w-full px-[26px] text-[14px] leading-[30px] text-blue_gray-600 hover:cursor-pointer"
          onClick={handleSetFavoriteCityClick}
        >
          관심 도시 설정
        </p>
      </div>
    </div>
  );
};
export default FavoriteCitiesDropdownList;
