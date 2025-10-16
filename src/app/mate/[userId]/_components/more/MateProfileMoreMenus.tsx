import { ErrorModalData } from 'components/modal/useModal';
import { ToastType } from 'components/toast';
import MateBlockMenu from './MateBlockMenu';
import SingoMateMenu from './SingoMateMenu';

interface Props {
  handleBlockMateClick: () => void;
}

const MateProfileMoreMenus = ({ handleBlockMateClick }: Props) => {
  return (
    <div className="flex w-[128px] flex-col rounded-[10px] bg-white py-[8px] text-[14px] leading-[14px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]">
      <SingoMateMenu />
      <MateBlockMenu handleBlockMateClick={handleBlockMateClick} />
    </div>
  );
};

export default MateProfileMoreMenus;
