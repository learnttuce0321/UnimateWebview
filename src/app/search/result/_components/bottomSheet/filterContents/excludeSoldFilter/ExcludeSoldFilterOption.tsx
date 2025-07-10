import React from 'react';
import { ExcludeFilterType } from './ExcludeSoldFilterContent';

interface Props {
  value: ExcludeFilterType;
  label: string;
  isSelected: boolean;
  onSelect: (filter: ExcludeFilterType) => void;
}

const ExcludeSoldFilterOption = ({ value, label, isSelected, onSelect }: Props) => {
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

export default ExcludeSoldFilterOption;