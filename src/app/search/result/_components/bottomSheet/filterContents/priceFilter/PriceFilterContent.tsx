'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { API_PRODUCTS_SEARCH_PRICE_RANGE } from 'modules/keyFactory/product';
import PriceRangeInput from './PriceRangeInput';
import PriceRangeSlider from './PriceRangeSlider';
import PriceUnitToggle from './PriceUnitToggle';
import TitleBottomSheet from './TitleBottomSheet';

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

interface Props {
  closeSheet: () => void;
}

const PriceFilterContent = ({ closeSheet }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('q') as string;

  const { data, isLoading, isError } = useQuery<PriceRangeResponse>({
    queryKey: [API_PRODUCTS_SEARCH_PRICE_RANGE, { searchKeyword }],
  });

  const [currency, setCurrency] = useState<Currency>('KRW');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // 슬라이더 범위를 고정하기 위한 기준 값 (Input으로 설정한 원본 값)
  const [baseMinPrice, setBaseMinPrice] = useState('');
  const [baseMaxPrice, setBaseMaxPrice] = useState('');

  // API 데이터가 로드되면 기본값 설정
  useEffect(() => {
    if (data) {
      const priceRange = currency === 'USD' ? data.usd : data.krw;
      const queryMinPrice = searchParams.get('minPrice');
      const queryMaxPrice = searchParams.get('maxPrice');

      // 쿼리 파라미터가 있으면 그것을 사용, 없으면 API 기본값 사용
      const defaultMin = queryMinPrice || priceRange.minPrice.toString();
      const defaultMax = queryMaxPrice || priceRange.maxPrice.toString();

      setMinPrice(defaultMin);
      setMaxPrice(defaultMax);
      setBaseMinPrice(defaultMin);
      setBaseMaxPrice(defaultMax);
    }
  }, [data, currency, searchParams]);

  if (isLoading) {
    return <div className="h-[200px]" />;
  }

  if (isError || !data) {
    return null;
  }

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
    // Input에 직접 입력한 값은 슬라이더 범위의 기준이 됨
    setBaseMinPrice(min);
    setBaseMaxPrice(max);
  };

  const handleSliderChange = (min: number, max: number) => {
    // 슬라이더 값을 Input에 표시 (포맷팅 필요)
    setMinPrice(min.toLocaleString());
    setMaxPrice(max.toLocaleString());
    // baseMinPrice, baseMaxPrice는 변경하지 않음 (슬라이더 범위 유지)
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
          minPrice={baseMinPrice}
          maxPrice={baseMaxPrice}
          onSliderChange={handleSliderChange}
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
