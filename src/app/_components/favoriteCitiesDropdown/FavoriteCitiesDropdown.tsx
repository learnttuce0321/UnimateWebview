import FavoriteCitiesDropdownList from 'app/_components/favoriteCitiesDropdown/FavoriteCitiesDropdownList';
import Overlay from 'components/modal/Overlay';

interface Props {
  onClose: () => void;
}

const FavoriteCitesDropdown = ({ onClose }: Props) => {
  return (
    <>
      <FavoriteCitiesDropdownList onClose={onClose} />
      <Overlay onClick={onClose} />
    </>
  );
};

export default FavoriteCitesDropdown;
