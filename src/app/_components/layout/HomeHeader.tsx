import FavoriteCitiesDropdownButton from 'app/_components/favoriteCitiesDropdown/FavoriteCitiesDropdownButton';
import AlarmButton from 'app/_components/layout/AlarmButton';
import SearchButton from 'app/_components/layout/SearchButton';

const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between w-full h-navigation py-[13px] pl-[16px] pr-[12px] bg-white">
      <FavoriteCitiesDropdownButton />
      <div className="flex gap-[22px]">
        <AlarmButton />
        <SearchButton />
      </div>
    </header>
  );
};

export default HomeHeader;
