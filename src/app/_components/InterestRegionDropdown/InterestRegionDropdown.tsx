import { Suspense } from 'react';
import InterestRegionDropdownList from 'app/_components/InterestRegionDropdown/InterestRegionDropdownList';
import Overlay from 'components/modal/Overlay';

interface Props {
  onClose: () => void;
}

const InterestRegionDropdown = ({ onClose }: Props) => {
  return (
    <>
      <Suspense>
        <InterestRegionDropdownList onClose={onClose} />
      </Suspense>
      <Overlay onClick={onClose} />
    </>
  );
};

export default InterestRegionDropdown;
