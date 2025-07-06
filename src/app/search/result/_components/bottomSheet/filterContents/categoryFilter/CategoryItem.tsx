import React from 'react';

interface Props {
  category: string;
  englishName: string;
  isSelected: boolean;
  onSelect: (englishName: string | null) => void;
}

const CategoryItem = ({ category, englishName, isSelected, onSelect }: Props) => {
  const toggleImgUrl = isSelected
    ? '/images/svg/search/iconToggleCheck.svg'
    : '/images/svg/search/iconToggleCheckNone.svg';

  const handleCategoryClick = () => {
    // 이미 선택된 카테고리를 클릭하면 해제, 아니면 선택
    onSelect(isSelected ? null : englishName);
  };

  return (
    <li
      key={category}
      className="flex items-center gap-[10px]"
      onClick={handleCategoryClick}
    >
      <button type="button">
        <img src={toggleImgUrl} alt="버튼" />
      </button>
      <p>{category}</p>
    </li>
  );
};

export default CategoryItem;
