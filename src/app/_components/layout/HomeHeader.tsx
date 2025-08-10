import InterestRegionDropdownButton from 'app/_components/InterestRegionDropdown/InterestRegionDropdownButton';
import AlarmButton from 'app/_components/layout/AlarmButton';
import SearchButton from 'app/_components/layout/SearchButton';

const HomeHeader = () => {
  return (
    <header className="flex h-navigation w-full items-center justify-between bg-white py-[13px] pl-[16px] pr-[12px]">
      <InterestRegionDropdownButton />
      <div className="flex gap-[22px]">
        <AlarmButton />
        <SearchButton />
      </div>
    </header>
  );
};

export default HomeHeader;
