import { useRef, useState } from 'react';
import AddFavoriteCityButton from 'app/interest/_components/search/AddInterestRegionButton';
import SearchedCity from 'app/interest/_components/search/SearchedCity';
import { ActionType } from 'app/interest/_types/search';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient from 'modules/fetchClient';
import { API_REGION_SEARCH } from 'modules/keyFactory.region';
import { normalizeString } from 'modules/normalize';
import { SearchedRegion, SearchedRegionResponse } from 'types/Region';

interface Props {
  inputValue: string;
  handleChangeActionType: (actionType: ActionType) => void;
}

const SearchedInterestRegionList = ({
  inputValue,
  handleChangeActionType,
}: Props) => {
  const [selectedRegion, setSelectedRegion] = useState<SearchedRegion | null>(
    null
  );
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const {
    data: searchedRegion,
    isLoading,
    isError,
  } = useInfiniteQueryWithObserver<SearchedRegionResponse>(
    infiniteTarget,
    {
      queryKey: [API_REGION_SEARCH, inputValue],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<SearchedRegionResponse>({
            url: API_REGION_SEARCH,
            params: {
              pageNumber: pageParam,
              name: normalizeString(inputValue),
            },
          });

          return res;
        } catch (error) {
          console.log('membership detail error', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return allPages.length + 1;
        }
        return null;
      },
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const searchedRegionList = searchedRegion?.pages.flatMap(
    (page) => page.contents
  );

  if (
    isLoading ||
    isError ||
    !searchedRegionList ||
    !searchedRegionList.length
  ) {
    return null;
  }

  const handleRegionClick = (region: SearchedRegion) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <ul className="flex flex-col gap-[10px]">
        {searchedRegionList.map((region) => (
          <SearchedCity
            key={region.id}
            region={region}
            isSelectedRegion={region.id === selectedRegion?.id}
            onClick={handleRegionClick}
          />
        ))}
      </ul>
      <div ref={infiniteTarget} />
      <AddFavoriteCityButton
        selectedRegion={selectedRegion}
        handleChangeActionType={handleChangeActionType}
      />
    </>
  );
};

export default SearchedInterestRegionList;
