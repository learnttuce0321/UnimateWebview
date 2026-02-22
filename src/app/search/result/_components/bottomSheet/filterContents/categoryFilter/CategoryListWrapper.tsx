import React from 'react';
import { categoryData } from 'constants/categoryData';
import CategoryItem from './CategoryItem';

interface Props {
  selectedCategories: string[];
  onCategorySelect: (categories: string[]) => void;
}

const CategoryListWrapper = ({
  selectedCategories,
  onCategorySelect,
}: Props) => {
  const handleToggleCategory = (englishName: string) => {
    const isSelected = selectedCategories.includes(englishName);
    if (isSelected) {
      // 이미 선택된 경우 제거
      onCategorySelect(selectedCategories.filter((cat) => cat !== englishName));
    } else {
      // 선택되지 않은 경우 추가
      onCategorySelect([...selectedCategories, englishName]);
    }
  };

  return (
    <ul className="mt-4 flex h-[146px] w-full flex-col gap-[14px] overflow-auto pb-[14px]">
      {categoryData.map((item) => {
        return (
          <CategoryItem
            key={item.categoryEN}
            category={item.category}
            englishName={item.categoryEN}
            isSelected={selectedCategories.includes(item.categoryEN)}
            onSelect={handleToggleCategory}
          />
        );
      })}
    </ul>
  );
};

export default CategoryListWrapper;
