import React from 'react';
// 아니 이거 경로 왜이래 근데..
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { API_PRODUCTS_SEARCH_PRICE_RANGE } from 'modules/keyFactory/product';
import { formatNumber } from '../../../../../../../utils/formatNumber';

// TODO: 최저가, 최고가 데이터 받아오기
const MIN_PRICE_KRW = '10,000';
const MAX_PRICE_KRW = '100,000';
const MIN_PRICE_USD = '3';
const MAX_PRICE_USD = '123';

type Currency = 'KRW' | 'USD';

interface PriceRangeResponse {
  krw: {
    minPrice: number;
    maxPrice: number;
  };
  usd: {
    minPrice: number;
    maxPrice: number;
  };
}

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
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('q') as string;

  const { data, isLoading, isError } = useQuery<PriceRangeResponse>({
    queryKey: [API_PRODUCTS_SEARCH_PRICE_RANGE, { searchKeyword }],
  });

  if (isLoading) {
    return <div className="h-[40px]" />;
  }

  if (isError || !data) {
    return null;
  }

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
      ? { min: data.usd.minPrice, max: data.usd.maxPrice }
      : { min: data.krw.minPrice, max: data.krw.maxPrice };
  };

  const placeholders = getPlaceholders();

  return (
    <div className="flex h-[40px] w-full items-center justify-between">
      {/* 좌측 input */}
      <div className="flex h-full flex-1 items-center justify-center rounded-[8px] border-0.5 border-blue_gray-400 pr-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder={placeholders.min.toString()}
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
          inputMode="numeric"
          pattern="[0-9]*"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder={placeholders.max.toString()}
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
