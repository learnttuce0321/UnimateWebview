'use client';

import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import navigationScheme from 'utils/navigationScheme';

const CheckVerifiedUniversityEmailButton = () => {
  const { closeWeb } = navigationScheme();

  const handleClick = () => {
    closeWeb();
    return;
  };

  return <BottomFixedConfirmButton buttonText="확인" onClick={handleClick} />;
};

export default CheckVerifiedUniversityEmailButton;
