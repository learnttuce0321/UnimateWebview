'use client';

import { useState } from 'react';
import SearchResultHeader from 'app/search/result/_components/header/SearchResultHeader';
import SearchedProductList from 'app/search/result/_components/searchedProduct/SearchedProductList';
import { normalizeString } from 'modules/normalize';
import SearchFilterBottomSheetContainer from './_components/bottomSheet/SearchFilterBottomSheetContainer';
import SearchResultFilters from './_components/filters/SearchResultFilters';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  const [currentUniversityName, setCurrentUniversityName] = useState<
    string | null
  >(null);

  const handleChangeUniversity = (universityName: string) => {
    setCurrentUniversityName(universityName);
  };

  return (
    <div>
      <SearchResultHeader q={normalizeString(searchParams.q)} />
      <SearchResultFilters
        currentUniversityName={currentUniversityName}
        handleChangeUniversity={handleChangeUniversity}
      />
      <SearchedProductList />
      <SearchFilterBottomSheetContainer />
    </div>
  );
};

export default Page;
