'use client';

import { SEARCH_PAGE_ADD_FILTERING_UNIVERSITY } from 'constants/storageSync';
import { useStorageSync } from 'hooks/useStorageSync';
import navigationScheme from 'utils/navigationScheme';

interface Props {
  currentUniversityName: string | null;
  handleChangeUniversity: (universityName: string) => void;
}

const UniversityFilterButton = ({
  currentUniversityName,
  handleChangeUniversity,
}: Props) => {
  const { openWeb } = navigationScheme();

  useStorageSync(SEARCH_PAGE_ADD_FILTERING_UNIVERSITY, (newValue) => {
    const { universityName } = newValue as Record<string, any>;
    console.log('universityName', universityName);
    handleChangeUniversity(universityName);
  });

  return (
    <button
      type="button"
      onClick={() => openWeb('/search/result/filter-university')}
      className={`flex h-[30px] min-w-[79px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-solid pl-[12px] pr-[6px] ${
        currentUniversityName
          ? 'border-blue-600_P bg-blue-600_P text-white'
          : 'border-blue_gray-400 bg-white'
      }`}
    >
      <p
        className={`whitespace-nowrap text-[14px] leading-[30px] ${
          currentUniversityName ? 'text-white' : 'text-blue_gray-900'
        }`}
      >
        {currentUniversityName ?? '대학교'}
      </p>
      <img
        src={`/images/svg/search/iconArrowChevronDownSmall24${currentUniversityName ? '-white' : ''}.svg`}
        alt="대학교"
        className="ml-[4px] h-[16px] w-[16px] flex-shrink-0"
      />
    </button>
  );
};
export default UniversityFilterButton;
