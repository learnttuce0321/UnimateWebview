'use client';

import { SEARCH_PAGE_ADD_FILTERING_UNIVERSITY } from 'constants/storageSync';
import { useStorageSync } from 'hooks/useStorageSync';
import navigationScheme from 'utils/navigationScheme';
import { FilteringUniversity } from '../../page';

interface Props {
  currentFilteringUniversity: FilteringUniversity | null;
  handleChangeUniversity: (
    universityId: number,
    universityName: string
  ) => void;
}

const UniversityFilterButton = ({
  currentFilteringUniversity,
  handleChangeUniversity,
}: Props) => {
  const { openWeb } = navigationScheme();

  useStorageSync(SEARCH_PAGE_ADD_FILTERING_UNIVERSITY, (newValue) => {
    const { universityId, universityName } = newValue as Record<string, any>;

    handleChangeUniversity(universityId, universityName);
  });

  return (
    <button
      type="button"
      onClick={() => openWeb('/search/result/filter-university')}
      className={`flex h-[30px] min-w-[79px] flex-shrink-0 items-center justify-between overflow-hidden rounded-[5px] border-[0.5px] border-solid pl-[12px] pr-[6px] ${
        currentFilteringUniversity
          ? 'border-blue-600_P bg-blue-600_P text-white'
          : 'border-blue_gray-400 bg-white'
      }`}
    >
      <p
        className={`whitespace-nowrap text-[14px] leading-[30px] ${
          currentFilteringUniversity ? 'text-white' : 'text-blue_gray-900'
        }`}
      >
        {currentFilteringUniversity?.name ?? '대학교'}
      </p>
      <img
        src={`/images/svg/search/iconArrowChevronDownSmall24${currentFilteringUniversity ? '-white' : ''}.svg`}
        alt="대학교"
        className="ml-[4px] h-[16px] w-[16px] flex-shrink-0"
      />
    </button>
  );
};
export default UniversityFilterButton;
