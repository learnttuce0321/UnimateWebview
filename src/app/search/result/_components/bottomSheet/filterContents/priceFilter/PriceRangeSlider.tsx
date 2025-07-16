import React, { useState, useRef, useCallback, useEffect } from 'react';
import { formatNumber } from '../../../../../../../utils/formatNumber';

type Currency = 'KRW' | 'USD';

// 가격 범위 상수
const PRICE_RANGES = {
  KRW: { min: 4000, max: 184000 },
  USD: { min: 3, max: 123 },
};

interface PriceRangeSliderProps {
  currency: Currency;
  onPriceChange: (minPrice: string, maxPrice: string) => void;
}

const PriceRangeSlider = ({
  currency,
  onPriceChange,
}: PriceRangeSliderProps) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const priceRange = PRICE_RANGES[currency];

  // 퍼센트를 실제 가격으로 변환
  const percentToPrice = useCallback(
    (percent: number) => {
      const range = priceRange.max - priceRange.min;
      return Math.round(priceRange.min + (range * percent) / 100);
    },
    [priceRange]
  );

  // 가격 변경 시 부모 컴포넌트에 알림
  const notifyPriceChange = useCallback(
    (minPercent: number, maxPercent: number) => {
      const minPrice = percentToPrice(minPercent);
      const maxPrice = percentToPrice(maxPercent);
      onPriceChange(
        formatNumber(minPrice.toString()),
        formatNumber(maxPrice.toString())
      );
    },
    [percentToPrice, onPriceChange]
  );

  // 마우스/터치 다운 이벤트
  const handleMouseDown = useCallback(
    (type: 'min' | 'max') => (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(type);
    },
    []
  );

  const handleTouchStart = useCallback(
    (type: 'min' | 'max') => (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(type);
    },
    []
  );

  // 공통 이동 처리 함수
  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((clientX - rect.left) / rect.width) * 100)
      );

      // 10% 단위로 스냅
      const snappedPercentage = Math.round(percentage / 10) * 10;

      if (isDragging === 'min') {
        const newMinValue = Math.min(snappedPercentage, maxValue - 10);
        setMinValue(newMinValue);
        notifyPriceChange(newMinValue, maxValue);
      } else if (isDragging === 'max') {
        const newMaxValue = Math.max(snappedPercentage, minValue + 10);
        setMaxValue(newMaxValue);
        notifyPriceChange(minValue, newMaxValue);
      }
    },
    [isDragging, minValue, maxValue, notifyPriceChange]
  );

  // 마우스 이동 이벤트
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  // 터치 이동 이벤트
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  // 마우스/터치 업 이벤트
  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(null);
  }, []);

  // 이벤트 리스너 등록/해제
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className="h-5 w-full">
      {/* 슬라이더 */}
      <div className="relative h-[3px] w-full" ref={sliderRef}>
        {/* 배경 트랙 */}
        <div className="absolute inset-0 rounded-[3px] bg-gray-200"></div>

        {/* 활성 범위 */}
        <div
          className="absolute top-0 h-full rounded-full bg-blue-600_P"
          style={{
            left: `${minValue}%`,
            width: `${maxValue - minValue}%`,
          }}
        ></div>

        {/* 최소값 핸들 */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 translate-x-2 cursor-pointer rounded-full border-2 border-blue-600_P bg-white shadow-md"
          style={{ left: `calc(${minValue}% - 12px)` }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
        ></div>

        {/* 최대값 핸들 */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-blue-600_P bg-white shadow-md"
          style={{ left: `calc(${maxValue}% - 12px)` }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
        ></div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
