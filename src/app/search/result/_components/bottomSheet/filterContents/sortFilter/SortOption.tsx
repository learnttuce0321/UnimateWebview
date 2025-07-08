import React from 'react';
import { SortType } from './SortFilterContent';

interface Props {
  value: SortType;
  label: string;
  isSelected: boolean;
  onSelect: (sort: SortType) => void;
}

const SortOption = ({ value, label, isSelected, onSelect }: Props) => {
  const handleOptionClick = () => {
    onSelect(value);
  };

  return (
    <div
      className={`flex h-[50px] w-full cursor-pointer items-center justify-center ${isSelected ? 'bg-blue_gray-100' : 'bg-white'} touch-manipulation select-none`}
      onClick={handleOptionClick}
    >
      <p
        className={`text-4 ${isSelected ? 'font-semibold text-blue-600_P' : 'font-medium text-blue_gray-600'}`}
      >
        {label}
      </p>
    </div>
  );
};

export default SortOption;
