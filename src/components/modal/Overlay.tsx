import { MODAL_OVERLAY_Z_INDEX } from 'app/constants/zIndex';

interface Props {
  backgroundColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Overlay = ({
  backgroundColor = '#00000080',
  onClick = () => {},
  children = <></>,
}: Props) => {
  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 z-[${MODAL_OVERLAY_Z_INDEX}]`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
