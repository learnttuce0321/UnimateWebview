'use client';

import { useRef } from 'react';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient from 'modules/fetch/fetchClient';
import { API_UNIVERSITY_SEARCH } from 'modules/keyFactory/university';
import { normalizeString } from 'modules/normalize';
import { University } from 'types/University';
import SearchedUniversity from './SearchedUniversity';

interface SearchUniversityResponse {
  contents: University[];
  hasNext: boolean;
}

interface Props {
  inputValue: string;
  selectedUniversityId: number | null;
  handleUniversityClick: (value: University) => void;
}

const FilteringUniversityList = ({
  inputValue,
  selectedUniversityId,
  handleUniversityClick,
}: Props) => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: searchedUniversity,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<SearchUniversityResponse>(
    infiniteTarget,
    {
      queryKey: [API_UNIVERSITY_SEARCH, normalizeString(inputValue)],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<SearchUniversityResponse>({
            url: API_UNIVERSITY_SEARCH,
            params: {
              pageNumber: pageParam,
              name: normalizeString(inputValue),
            },
          });

          return res;
        } catch (error) {
          console.log('search interest region', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return allPages.length + 1;
        }
        return null;
      },
      // enabled: !!normalizeString(inputValue),
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const searchedUniversityList = searchedUniversity?.pages.flatMap(
    (page) => page.contents
  );

  if (
    isLoading ||
    isError ||
    !searchedUniversityList ||
    !searchedUniversityList.length
  ) {
    return null;
  }

  return (
    <>
      <ul className="px-[16px]">
        {searchedUniversityList.map((university) => {
          return (
            <SearchedUniversity
              key={university.id}
              university={university}
              isSelected={selectedUniversityId === university.id}
              handleUniversityClick={handleUniversityClick}
            />
          );
        })}
      </ul>
      <div ref={infiniteTarget} />
    </>
  );
};

export default FilteringUniversityList;
