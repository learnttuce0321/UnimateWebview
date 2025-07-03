import React from 'react';

type Currency = 'KRW' | 'USD';

interface PriceUnitToggleProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const PriceUnitToggle = ({ currency, onCurrencyChange }: PriceUnitToggleProps) => {
  const handleCurrencySelect = (selected: Currency) => {
    onCurrencyChange(selected);
  };

  return (
    <>
      {/* 통화 선택 */}
      <div className="flex h-[20px] gap-[12px] text-[14px] font-medium leading-[20px] text-blue_gray-900">
        {/* 원화 */}
        <div
          className="flex gap-[6px]"
          onClick={() => handleCurrencySelect('KRW')}
        >
          <button type="button">
            <img
              src={
                currency === 'KRW'
                  ? '/images/svg/register/icon-toggle-radio.svg'
                  : '/images/svg/register/icon-toggle-radio-none.svg'
              }
              alt="원화"
              className="rounded-full"
            />
          </button>
          <span>원화</span>
        </div>

        {/* 달러 */}
        <div
          className="flex gap-[6px]"
          onClick={() => handleCurrencySelect('USD')}
        >
          <button type="button">
            <img
              src={
                currency === 'USD'
                  ? '/images/svg/register/icon-toggle-radio.svg'
                  : '/images/svg/register/icon-toggle-radio-none.svg'
              }
              alt="달러"
              className="rounded-full"
            />
          </button>
          <span>달러</span>
        </div>
      </div>
    </>
  );
};

export default PriceUnitToggle;
