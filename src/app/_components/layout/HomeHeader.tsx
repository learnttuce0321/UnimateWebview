import AlarmButton from 'app/_components/layout/AlarmButton';
import FavoriteCitiesDropdown from 'app/_components/layout/FavoriteCitiesDropdown';
import SearchButton from 'app/_components/layout/SearchButton';

const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between w-full h-navigation py-[13px] pl-[16px] pr-[12px] bg-white">
      <FavoriteCitiesDropdown />
      <div className="flex gap-[22px]">
        <AlarmButton />
        <SearchButton />
      </div>
    </header>
  );
};

export default HomeHeader;
