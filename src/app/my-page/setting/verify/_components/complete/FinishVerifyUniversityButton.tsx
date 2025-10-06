import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import navigationScheme from 'utils/navigationScheme';

const FinishVerifyUniversityButton = () => {
  const { closeWeb } = navigationScheme();

  const handleClick = () => {
    closeWeb();
  };
  return <BottomFixedConfirmButton buttonText="확인" onClick={handleClick} />;
};

export default FinishVerifyUniversityButton;
