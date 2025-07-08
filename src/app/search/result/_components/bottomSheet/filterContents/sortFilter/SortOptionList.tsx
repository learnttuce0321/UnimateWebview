import React from 'react';
import { SortType } from './SortFilterContent';
import SortOption from './SortOption';

interface Props {
  selectedSort: SortType;
  onSortSelect: (sort: SortType) => void;
}

const sortOptions = [
  { value: 'latest' as const, label: '최신순' },
  { value: 'oldest' as const, label: '오래된순' },
];

const SortOptionList = ({ selectedSort, onSortSelect }: Props) => {
  return (
    <div className="h-25 mt-4 flex w-full flex-col items-center justify-center">
      {sortOptions.map((option) => (
        <SortOption
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

export default SortOptionList;
