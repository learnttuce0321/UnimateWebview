import CitiesSettingDescription from 'app/interest/_components/description/CitiesSettingDescription';
import CountryLabel from 'app/interest/_components/description/CountryLabel';
import SearchInterestRegionSection from 'app/interest/_components/search/SearchInterestRegionSection';

const Page = () => {
  return (
    <>
      <CountryLabel />
      <CitiesSettingDescription />
      <SearchInterestRegionSection />
    </>
  );
};

export default Page;
