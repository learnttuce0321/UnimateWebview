import React from 'react';
// 아니 이거 경로 왜이래 근데..
import { formatNumber } from '../../../../../../../utils/formatNumber';

// TODO: 최저가, 최고가 데이터 받아오기
const MIN_PRICE_KRW = '4,000';
const MAX_PRICE_KRW = '184,000';
const MIN_PRICE_USD = '3';
const MAX_PRICE_USD = '123';

type Currency = 'KRW' | 'USD';

interface PriceRangeInputProps {
  currency: Currency;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (minPrice: string, maxPrice: string) => void;
}

const PriceRangeInput = ({
  currency,
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceRangeInputProps) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    onPriceChange(formatted, maxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    onPriceChange(minPrice, formatted);
  };

  const getPlaceholders = () => {
    return currency === 'USD'
      ? { min: MIN_PRICE_USD, max: MAX_PRICE_USD }
      : { min: MIN_PRICE_KRW, max: MAX_PRICE_KRW };
  };

  const placeholders = getPlaceholders();

  return (
    <div className="flex h-[40px] w-full items-center justify-between">
      {/* 좌측 input */}
      <div className="flex h-full flex-1 items-center justify-center rounded-[8px] border-0.5 border-blue_gray-400 pr-2">
        <input
          type="text"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder={placeholders.min}
          className="text-4 h-4 w-full pr-1 text-right font-normal leading-4 placeholder:text-blue_gray-500"
        />
        <span className="text-right text-[14px] font-semibold leading-[40px]">
          {currency === 'USD' ? '$' : '원'}
        </span>
      </div>

      {/* 가운데 - */}
      <span className="w-[21px] text-center">-</span>

      {/* 우측 input */}
      <div className="flex h-full flex-1 items-center justify-center rounded-[8px] border-0.5 border-blue_gray-400 pr-2">
        <input
          type="text"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder={placeholders.max}
          className="text-4 h-4 w-full pr-1 text-right font-normal leading-4 placeholder:text-blue_gray-500"
        />
        <span className="text-right text-[14px] font-semibold leading-[40px]">
          {currency === 'USD' ? '$' : '원'}
        </span>
      </div>
    </div>
  );
};

export default PriceRangeInput;
