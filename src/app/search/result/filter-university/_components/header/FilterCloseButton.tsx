'use client';

import navigationScheme from 'utils/navigationScheme';

const FilterCloseButton = () => {
  const { closeWeb } = navigationScheme();
  return (
    <button onClick={() => closeWeb()}>
      <img
        src="/images/svg/search/icon-system-close.svg"
        alt="닫기"
        width="24"
        height="24"
      />
    </button>
  );
};

export default FilterCloseButton;
