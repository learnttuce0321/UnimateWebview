import React from 'react';

interface Props {
  closeSheet: () => void;
}

const BottomSheetDimmed = ({ closeSheet }: Props) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full h-full bg-black bg-opacity-50"
      onClick={closeSheet}
    ></div>
  );
};

export default BottomSheetDimmed;
