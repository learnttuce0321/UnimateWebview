'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  currentUniversity: string | null;
}

const UniversityFilterButton = () => {
  const router = useRouter();
  const [currentUniversity, setCurrentUniversity] = useState<string | null>(
    null
  );

  return (
    <button
      type="button"
      onClick={() => router.replace('/search/result/filter-university')}
      className={`flex h-[30px] min-w-[79px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-solid pl-[12px] pr-[6px] ${
        currentUniversity
          ? 'border-blue-600_P bg-blue-600_P text-white'
          : 'border-blue_gray-400 bg-white'
      }`}
    >
      <p
        className={`whitespace-nowrap text-[14px] leading-[30px] ${
          currentUniversity ? 'text-white' : 'text-blue_gray-900'
        }`}
      >
        {currentUniversity ?? '대학교'}
      </p>
      <img
        src={`/images/svg/search/iconArrowChevronDownSmall24${currentUniversity ? '-white' : ''}.svg`}
        alt="대학교"
        className="ml-[4px] h-[16px] w-[16px] flex-shrink-0"
      />
    </button>
  );
};
export default UniversityFilterButton;
