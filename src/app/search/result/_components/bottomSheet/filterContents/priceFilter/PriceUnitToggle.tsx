import React, { useState } from 'react';

type Currency = 'KRW' | 'USD';

const PriceUnitToggle = () => {
  const [currency, setCurrency] = useState<Currency>('KRW');

  const handleCurrencySelect = (selected: Currency) => {
    setCurrency(selected);
  };

  return (
    <>
      {/* 통화 선택 */}
      <div className="flex h-[20px] gap-[12px] leading-[20px]">
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
