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
      className="bg-black fixed bottom-0 left-0 z-50 h-full w-full bg-opacity-50"
      onClick={closeSheet}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'none' }}
    />
  );
};

export default BottomSheetDimmed;
