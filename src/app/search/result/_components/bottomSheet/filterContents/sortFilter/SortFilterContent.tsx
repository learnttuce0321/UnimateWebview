import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';
import SortOptionList from './SortOptionList';

interface Props {
  closeSheet: () => void;
}

export type SortType = 'latest' | 'oldest';

const SortFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');

  const handleApplySortFilter = () => {
    if (selectedSort) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('sort', selectedSort);

      // TODO : 지금은 페이지 새로고침이지만, 추후에 검색 api 호출할거임
      window.location.href = currentUrl.toString();
    } else {
      closeSheet();
    }
  };

  // URL에서 sort 파라미터를 가져와서 초기값으로 설정
  useEffect(() => {
    const sortParam = searchParams.get('sort') as SortType;
    if (sortParam && (sortParam === 'latest' || sortParam === 'oldest')) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col">
      <TitleBottomSheet title="정렬" />
      <SortOptionList
        selectedSort={selectedSort}
        onSortSelect={setSelectedSort}
      />

      <div className="-mx-4 w-[calc(100%+32px)] px-4 py-[10px]">
        <button
          type="button"
          onClick={handleApplySortFilter}
          className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-[18px] font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SortFilterContent;
