import React, { useState, useRef, useCallback, useEffect } from 'react';

type Currency = 'KRW' | 'USD';

interface PriceRangeSliderProps {
  currency: Currency;
  minPrice?: string;
  maxPrice?: string;
  onSliderChange?: (minPrice: number, maxPrice: number) => void;
}

const PriceRangeSlider = ({
  currency,
  minPrice,
  maxPrice,
  onSliderChange,
}: PriceRangeSliderProps) => {
  // Input에서 입력된 값을 기준으로 동적 범위 계산
  const getDynamicPriceRange = useCallback(() => {
    const parsedMinPrice = minPrice
      ? parseInt(minPrice.replace(/,/g, ''), 10)
      : null;
    const parsedMaxPrice = maxPrice
      ? parseInt(maxPrice.replace(/,/g, ''), 10)
      : null;

    // 둘 다 입력된 경우, 입력된 값을 범위로 사용
    if (
      parsedMinPrice &&
      parsedMaxPrice &&
      !isNaN(parsedMinPrice) &&
      !isNaN(parsedMaxPrice)
    ) {
      return {
        min: parsedMinPrice,
        max: parsedMaxPrice,
      };
    }

    // 값이 없으면 null 반환
    return null;
  }, [minPrice, maxPrice]);

  const priceRange = getDynamicPriceRange();

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Input 값이 변경되면 슬라이더 초기화
  useEffect(() => {
    setMinValue(0);
    setMaxValue(100);
  }, [minPrice, maxPrice]);

  // 퍼센트를 실제 가격으로 변환
  const percentToPrice = useCallback(
    (percent: number) => {
      if (!priceRange) return 0;
      const range = priceRange.max - priceRange.min;
      return Math.round(priceRange.min + (range * percent) / 100);
    },
    [priceRange]
  );

  // 슬라이더 값이 변경될 때 부모에게 계산된 가격 전달
  useEffect(() => {
    if (onSliderChange && priceRange) {
      const calculatedMin = percentToPrice(minValue);
      const calculatedMax = percentToPrice(maxValue);
      onSliderChange(calculatedMin, calculatedMax);
    }
  }, [minValue, maxValue, percentToPrice, onSliderChange, priceRange]);

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
        // 슬라이더는 Input 값에 영향을 주지 않음
      } else if (isDragging === 'max') {
        const newMaxValue = Math.max(snappedPercentage, minValue + 10);
        setMaxValue(newMaxValue);
        // 슬라이더는 Input 값에 영향을 주지 않음
      }
    },
    [isDragging, minValue, maxValue]
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

  // priceRange가 없으면 빈 공간 렌더링
  if (!priceRange) {
    return <div className="h-5 w-full" />;
  }

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
