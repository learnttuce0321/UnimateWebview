import CitiesSettingDescription from 'app/inapp/favorite/_components/description/CitiesSettingDescription';
import CountryLabel from 'app/inapp/favorite/_components/description/CountryLabel';
import SearchFavoriteCitiesSection from 'app/inapp/favorite/_components/search/SearchFavoriteCitiesSection';

const Page = () => {
  return (
    <>
      <CountryLabel />
      <CitiesSettingDescription />
      <SearchFavoriteCitiesSection />
    </>
  );
};

export default Page;
