'use client';

import { useState } from 'react';
import SearchHeader from 'app/search/_components/header/SearchHeader';
import RecentSearches from 'app/search/_components/recentSearch/RecentSearches';
import { normalizeString } from 'modules/normalize';

interface Props {
  searchParams: {
    q: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>(
    normalizeString(searchParams.q)
  );

  return (
    <>
      <SearchHeader
        searchKeyword={searchKeyword}
        onSearchKeywordChange={(enteredKeyword) =>
          setSearchKeyword(enteredKeyword)
        }
      />
      <div className="min-h-[calc(100vh-50px)] w-full px-[16px] pt-[16px]">
        <RecentSearches />
      </div>
    </>
  );
};

export default Page;
