import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';
import CategoryListWrapper from './CategoryListWrapper';

interface Props {
  closeSheet: () => void;
}

const CategoryFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleApplyCategoryFilter = () => {
    const currentUrl = new URL(window.location.href);

    if (selectedCategory) {
      currentUrl.searchParams.set('category', selectedCategory);
    }

    router.replace(currentUrl.toString());
    closeSheet();
  };

  // URL에서 카테고리 파라미터를 가져와서 초기값으로 설정
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col w-full h-full">
      <TitleBottomSheet title="카테고리" />
      <CategoryListWrapper
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
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
