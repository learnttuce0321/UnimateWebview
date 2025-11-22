import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryListWrapper from './CategoryListWrapper';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';

interface Props {
  closeSheet: () => void;
}

const CategoryFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleApplyCategoryFilter = () => {
    const currentUrl = new URL(window.location.href);

    // 기존 categories 파라미터 모두 제거
    currentUrl.searchParams.delete('categories');

    if (selectedCategories.length > 0) {
      // 선택된 카테고리들을 각각 추가
      selectedCategories.forEach((category) => {
        currentUrl.searchParams.append('categories', category);
      });
    }

    router.replace(currentUrl.toString());
    closeSheet();
  };

  // URL에서 카테고리 파라미터들을 가져와서 초기값으로 설정
  useEffect(() => {
    const categoryParams = searchParams.getAll('categories');
    if (categoryParams.length > 0) {
      setSelectedCategories(categoryParams);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col">
      <TitleBottomSheet title="카테고리" />
      <CategoryListWrapper
        selectedCategories={selectedCategories}
        onCategorySelect={setSelectedCategories}
      />

      <div className="-mx-4 w-[calc(100%+32px)] px-4 py-[10px] shadow-[0px_-1px_10px_2px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={handleApplyCategoryFilter}
          className="h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-[18px] font-bold text-white"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CategoryFilterContent;
