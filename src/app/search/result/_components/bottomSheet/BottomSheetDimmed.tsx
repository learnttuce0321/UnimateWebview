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
      className="fixed bottom-0 left-0 h-full w-full bg-black bg-opacity-50"
      onClick={closeSheet}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'none' }}
    ></div>
  );
};

export default BottomSheetDimmed;
