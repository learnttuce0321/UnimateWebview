import React from 'react';
import { MODAL_OR_BOTTOM_SHEET_OVERLAY_Z_INDEX } from 'constants/zIndex';

interface Props {
  closeSheet: () => void;
}

const BottomSheetDimmed = ({ closeSheet }: Props) => {
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`fixed left-0 top-0 z-[${MODAL_OR_BOTTOM_SHEET_OVERLAY_Z_INDEX}] h-screen w-screen bg-black bg-opacity-50`}
      onClick={closeSheet}
      onTouchMove={handleTouchMove}
      style={{ touchAction: 'none' }}
    />
  );
};

export default BottomSheetDimmed;
