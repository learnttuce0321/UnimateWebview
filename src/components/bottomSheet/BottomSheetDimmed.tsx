import React from 'react';

interface Props {
  closeSheet: () => void;
}

const BottomSheetDimmed = ({ closeSheet }: Props) => {
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="z-overlay fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-50"
      onClick={closeSheet}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'none' }}
    />
  );
};

export default BottomSheetDimmed;
