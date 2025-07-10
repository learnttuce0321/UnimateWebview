import React from 'react';
import { ExcludeFilterType } from './ExcludeSoldFilterContent';
import ExcludeSoldFilterOption from './ExcludeSoldFilterOption';

interface Props {
  selectedSort: ExcludeFilterType;
  onSortSelect: (sort: ExcludeFilterType) => void;
}

type ExcludeOptionItem = {
  value: ExcludeFilterType;
  label: string;
};

const excludeOptions: ExcludeOptionItem[] = [
  { value: 'exclude_completed', label: '거래완료 제외' },
  { value: 'include_completed', label: '거래완료 포함' },
];

const ExcludeSoldFilterOptionList = ({ selectedSort, onSortSelect }: Props) => {
  return (
    <div className="h-25 mt-4 flex w-full flex-col items-center justify-center">
      {excludeOptions.map((option) => (
        <ExcludeSoldFilterOption
          key={option.value}
          value={option.value}
          label={option.label}
          isSelected={selectedSort === option.value}
          onSelect={onSortSelect}
        />
      ))}
    </div>
  );
};

export default ExcludeSoldFilterOptionList;