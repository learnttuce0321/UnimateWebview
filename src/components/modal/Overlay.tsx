import { MouseEvent } from 'react';
import { MODAL_OVERLAY_Z_INDEX } from 'constants/zIndex';

interface Props {
  backgroundColor?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Overlay = ({
  backgroundColor = '#00000080',
  onClick = () => {},
  children = <></>,
}: Props) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen z-[${MODAL_OVERLAY_Z_INDEX}]`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
