import { MouseEvent } from 'react';

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
      className="fixed left-0 top-0 z-overlay h-screen w-screen"
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
