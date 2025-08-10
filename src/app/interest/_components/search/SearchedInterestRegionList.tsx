import { useState } from 'react';
import AddFavoriteCityButton from 'app/interest/_components/search/AddInterestRegionButton';
import SearchedCity from 'app/interest/_components/search/SearchedCity';
import { ActionType } from 'app/interest/_types/search';

interface Props {
  inputValue: string;
  handleChangeActionType: (actionType: ActionType) => void;
}

const SearchedInterestRegionList = ({
  inputValue,
  handleChangeActionType,
}: Props) => {
  const [selectedCity, setSelectedCity] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleCityClick = (cityId: { id: string; name: string }) => {
    setSelectedCity(cityId);
  };

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {[
          { id: '1', name: 'Seoul' },
          { id: '2', name: 'Busan' },
          { id: '3', name: 'Incheon' },
        ].map((city) => (
          <SearchedCity
            key={city.id}
            city={city}
            currentSelectedCityId={selectedCity?.id}
            onClick={handleCityClick}
          />
        ))}
      </ul>
      <AddFavoriteCityButton
        selectedCity={selectedCity}
        handleChangeActionType={handleChangeActionType}
      />
    </>
  );
};

export default SearchedInterestRegionList;
