'use client';

import InterestRegionItem from 'app/_components/InterestRegionDropdown/InterestRegionItem';
import { useMutationChangePrimaryRegion } from 'hooks/users/useMutationChangePrimaryRegion';
import { useAppStore } from 'providers/ZustandProvider';
import { selectInterestRegions } from 'stores/selectors';
import navigationScheme from '../../../utils/navigationScheme';

interface Props {
  onClose: () => void;
}

const InterestRegionDropdownList = ({ onClose }: Props) => {
  const { openWeb } = navigationScheme();
  const { mutate } = useMutationChangePrimaryRegion();

  const userInterestRegions = useAppStore(selectInterestRegions);
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

  const handleSetInterestRegionClick = () => {
    openWeb(`/interest`);
    onClose();
  };

  return (
    <div className="absolute z-[11]">
      <div className="w-[163px] rounded-[10px] bg-white py-[8px]">
        {userInterestRegions.map((region) => (
          <InterestRegionItem
            key={region.regionId}
            region={region}
            onClick={() => handleCityClick(region.regionId, region.isPrimary)}
          />
        ))}
        <p
          className="h-[30px] w-full px-[26px] text-[14px] leading-[30px] text-blue_gray-600 hover:cursor-pointer"
          onClick={handleSetInterestRegionClick}
        >
          관심 도시 설정
        </p>
      </div>
    </div>
  );
};
export default InterestRegionDropdownList;
