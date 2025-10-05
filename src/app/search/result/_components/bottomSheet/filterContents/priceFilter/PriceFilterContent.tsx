'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PriceRangeInput from './PriceRangeInput';
import PriceRangeSlider from './PriceRangeSlider';
import PriceUnitToggle from './PriceUnitToggle';
import TitleBottomSheet from './TitleBottomSheet';

type Currency = 'KRW' | 'USD';

interface Props {
  closeSheet: () => void;
}

const PriceFilterContent = ({ closeSheet }: Props) => {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApplyPriceFilter = () => {
    const currentUrl = new URL(window.location.href);
    if (minPrice) {
      // 콤마 제거하고 숫자만 추출
      const priceValue = minPrice.replace(/,/g, '');

      currentUrl.searchParams.set('minPrice', priceValue);
    }

    if (maxPrice) {
      // 콤마 제거하고 숫자만 추출
      const priceValue = maxPrice.replace(/,/g, '');

      currentUrl.searchParams.set('maxPrice', priceValue);
    }

    router.replace(currentUrl.toString());
    closeSheet();
  };

  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <TitleBottomSheet title="가격" />

      <div className="mt-4 flex flex-col items-start justify-center gap-[20px]">
        <PriceUnitToggle currency={currency} onCurrencyChange={setCurrency} />
        <PriceRangeInput
          currency={currency}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
        />
        <PriceRangeSlider
          currency={currency}
          onPriceChange={handlePriceChange}
        />
      </div>

      <button
        type="button"
        onClick={handleApplyPriceFilter}
        className="mt-[10px] flex h-[50px] w-full items-center justify-center rounded-[10px] bg-blue-600_P text-[18px] font-bold leading-[50px] text-white"
      >
        확인
      </button>
    </div>
  );
};

export default PriceFilterContent;
