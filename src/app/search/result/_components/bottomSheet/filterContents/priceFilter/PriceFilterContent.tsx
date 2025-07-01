'use client';

import React from 'react';
import PriceUnitToggle from './PriceUnitToggle';
import TitleBottomSheet from './TitleBottomSheet';

interface Props {
  closeSheet: () => void;
}

const PriceFilterContent = ({ closeSheet }: Props) => {
  return (
    <div className="flex flex-col w-full h-full bg-slate-400">
      <TitleBottomSheet title="가격" />

      <div className="mt-[16px] flex flex-col items-start justify-center gap-[20px]">
        <PriceUnitToggle />

        <input type="number" placeholder="최저가" />

        <div>스크롤</div>
      </div>

      <button type="button" onClick={closeSheet}>
        확인
      </button>
    </div>
  );
};

export default PriceFilterContent;
