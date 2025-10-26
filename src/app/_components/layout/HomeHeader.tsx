import dynamic from 'next/dynamic';
import AlarmButton from 'app/_components/layout/AlarmButton';
import SearchButton from 'app/_components/layout/SearchButton';

const DynamicInterestRegionDropdownButton = dynamic(
  () =>
    import(
      'app/_components/InterestRegionDropdown/InterestRegionDropdownButton'
    ),
  {
    ssr: false,
    loading: () => <div className="w-[180px]" />,
  }
);

const HomeHeader = () => {
  return (
    <header className="h-navigation flex w-full items-center justify-between bg-white py-[13px] pl-[16px] pr-[12px]">
      <DynamicInterestRegionDropdownButton />
      <div className="flex gap-[22px]">
        <AlarmButton />
        <SearchButton />
      </div>
    </header>
  );
};

export default HomeHeader;
