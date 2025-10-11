'use client';

import { SEARCH_PAGE_ADD_FILTERING_UNIVERSITY } from 'constants/storageSyncKeyFactory/search';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import navigationScheme from 'utils/navigationScheme';

interface Props {
  selectedUniversityName: string;
  selectedUniversityId?: number;
}

const AddUniversityFilteringOptionButton = ({
  selectedUniversityName,
  selectedUniversityId,
}: Props) => {
  const { closeWeb } = navigationScheme();
  const handleSelectUniversityFilteringOption = () => {
    setLocalStorageAndSync(SEARCH_PAGE_ADD_FILTERING_UNIVERSITY, {
      universityName: selectedUniversityName,
      ...(selectedUniversityId && { universityId: selectedUniversityId }),
    });

    setTimeout(() => {
      closeWeb();
    }, 100);
  };

  return (
    <button
      type="button"
      className={`fixed bottom-[10px] mx-[16px] h-[50px] w-[calc(100%-32px)] rounded-[10px] text-white ${selectedUniversityName ? 'bg-blue-600_P' : 'bg-blue_gray-500'}`}
      onClick={handleSelectUniversityFilteringOption}
    >
      선택하기
    </button>
  );
};

export default AddUniversityFilteringOptionButton;
