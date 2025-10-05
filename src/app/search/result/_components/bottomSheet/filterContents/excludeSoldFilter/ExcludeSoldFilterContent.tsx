import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ExcludeSoldFilterOptionList from './ExcludeSoldFilterOptionList';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';

interface Props {
  closeSheet: () => void;
}

export type ExcludeFilterType = 'exclude_completed' | 'include_completed';

const ExcludeSoldFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSort, setSelectedSort] =
    useState<ExcludeFilterType>('exclude_completed');

  const handleApplySortFilter = () => {
    const currentUrl = new URL(window.location.href);

    if (selectedSort) {
      currentUrl.searchParams.set('excludeSold', selectedSort);
    }

    router.replace(currentUrl.toString());
    closeSheet();
  };

  // URL에서 sort 파라미터를 가져와서 초기값으로 설정
  useEffect(() => {
    const sortParam = searchParams.get('excludeSold') as ExcludeFilterType;
    if (
      sortParam &&
      (sortParam === 'exclude_completed' || sortParam === 'include_completed')
    ) {
      setSelectedSort(sortParam);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col">
      <TitleBottomSheet title="상품 보기 방식" />
      <ExcludeSoldFilterOptionList
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

export default ExcludeSoldFilterContent;
