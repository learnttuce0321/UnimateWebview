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

export interface FilteringUniversity {
  id: number;
  name: string;
}

const Page = ({ searchParams }: Props) => {
  const [currentFilteringUniversity, setCurrentFilteringUniversity] =
    useState<FilteringUniversity | null>(null);

  const handleChangeUniversity = (
    universityId: number,
    universityName: string
  ) => {
    if (universityId && universityName) {
      setCurrentFilteringUniversity({ id: universityId, name: universityName });
    }
  };

  return (
    <div>
      <SearchResultHeader q={normalizeString(searchParams.q)} />
      <SearchResultFilters
        currentFilteringUniversity={currentFilteringUniversity}
        handleChangeUniversity={handleChangeUniversity}
      />
      <SearchedProductList
        currentFilteringUniversity={currentFilteringUniversity}
      />
      <SearchFilterBottomSheetContainer />
    </div>
  );
};

export default Page;
