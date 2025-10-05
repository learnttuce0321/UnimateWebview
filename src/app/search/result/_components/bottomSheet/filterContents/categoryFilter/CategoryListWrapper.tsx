import React from 'react';
import { categoryTestData } from 'app/testDatas/categoryTestData';
import CategoryItem from './CategoryItem';

interface Props {
  selectedCategory: string | null;
  onCategorySelect: (englishName: string | null) => void;
}

const CategoryListWrapper = ({ selectedCategory, onCategorySelect }: Props) => {
  return (
    <ul className="mt-4 flex h-[146px] w-full flex-col gap-[14px] overflow-auto pb-[14px]">
      {categoryData.map((item) => {
        return (
          <CategoryItem
            key={item.categoryEN}
            category={item.category}
            englishName={item.categoryEN}
            isSelected={selectedCategory === item.categoryEN}
            onSelect={onCategorySelect}
          />
        );
      })}
    </ul>
  );
};

export default CategoryListWrapper;
