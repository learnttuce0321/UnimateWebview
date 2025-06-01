import { useState } from 'react';
import FavoriteCitiesDropdown from 'app/inapp/_components/layout/FavoriteCitiesDropdown';

interface Props {
  inputValue: string;
  handleFocus: (isFocused: boolean) => void;
}

const SearchedCitiesList = ({ inputValue, handleFocus }: Props) => {
  const [selectedCitiesId, setSelectedCities] = useState<number | null>(null);

  return (
    <div>
      <p
        className={`w-full h-[45px] line-clamp-1 text-[16px] pl-[16px] flex items-center border-[1px] ${selectedCitiesId === 1 ? 'border-blue-600_P rounded-[10px] bg-blue_gray-50' : 'border-white'}`}
        onClick={() => setSelectedCities(1)}
      >
        asdfasdf
      </p>
      <FavoriteCitiesDropdown selectedCitiesId={selectedCitiesId} />
    </div>
  );
};

export default SearchedCitiesList;
