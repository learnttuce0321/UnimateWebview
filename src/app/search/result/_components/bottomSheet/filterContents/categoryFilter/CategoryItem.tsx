import React from 'react';

interface Props {
  category: string;
  englishName: string;
  isSelected: boolean;
  onSelect: (englishName: string) => void;
}

const CategoryItem = ({
  category,
  englishName,
  isSelected,
  onSelect,
}: Props) => {
  const toggleImgUrl = isSelected
    ? '/images/svg/search/iconToggleCheck.svg'
    : '/images/svg/search/iconToggleCheckNone.svg';

  const handleCategoryClick = () => {
    onSelect(englishName);
  };

  return (
    <li
      key={category}
      className="flex items-center gap-[10px]"
      onClick={handleCategoryClick}
    >
      <button type="button">
        <img
          src={toggleImgUrl}
          alt="버튼"
          width={20}
          height={20}
          className="h-[20px] w-[20px]"
        />
      </button>
      <p>{category}</p>
    </li>
  );
};

export default CategoryItem;
