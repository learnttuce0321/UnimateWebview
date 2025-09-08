'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SortOptionList from './SortOptionList';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';

interface Props {
  closeSheet: () => void;
}

export type SortType = 'latest' | 'oldest';

const SortFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<SortType>('latest');

  const handleApplySortFilter = () => {
    const currentUrl = new URL(window.location.href);

    if (selectedSort) {
      currentUrl.searchParams.set('sort', selectedSort);
    }

    router.replace(currentUrl.toString());
    closeSheet();
  };

  // URL에서 sort 파라미터를 가져와서 초기값으로 설정
  useEffect(() => {
    const sortParam = searchParams.get('sort') as SortType;
    if (sortParam && (sortParam === 'latest' || sortParam === 'oldest')) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col w-full h-full">
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
