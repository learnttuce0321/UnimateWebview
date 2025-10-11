'use client';

import { University } from 'types/University';

interface Props {
  university: University;
  handleUniversityClick: (value: University) => void;
  isSelected: boolean;
}

const SearchedUniversity = ({
  university,
  handleUniversityClick,
  isSelected,
}: Props) => {
  return (
    <li
      className={`flex min-h-[45px] w-full items-center border-[1px] px-[16px] text-[16px] ${isSelected ? 'rounded-[10px] border-blue-600_P bg-blue_gray-50 text-blue-600_P' : 'border-white'}`}
      onClick={() => handleUniversityClick(university)}
    >
      {university.name ?? ''}
    </li>
  );
};

export default SearchedUniversity;
