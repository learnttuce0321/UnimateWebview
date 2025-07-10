import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TitleBottomSheet from '../priceFilter/TitleBottomSheet';
import CategoryListWrapper from './CategoryListWrapper';

interface Props {
  closeSheet: () => void;
}

const CategoryFilterContent = ({ closeSheet }: Props) => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleApplyCategoryFilter = () => {
    if (selectedCategory) {
      // 현재 URL에 category 파라미터 추가
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('category', selectedCategory);

      // TODO : 지금은 페이지 새로고침이지만, 추후에 검색 api 호출할거임
      window.location.href = currentUrl.toString();
    } else {
      closeSheet();
    }
  };

  // URL에서 카테고리 파라미터를 가져와서 초기값으로 설정
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col">
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
