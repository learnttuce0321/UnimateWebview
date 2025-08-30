import { useEffect } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormDataType } from 'app/register/_type/registerType';
import { formatNumber } from '../../../../../utils/formatNumber';

type Props = {
  register: UseFormRegister<FormDataType>;
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

export default function RegisterPriceInfo({
  register,
  setValue,
  watch,
}: Props) {
  const isDollar = watch('priceInfo.isDollar');
  const isForGiveaway = watch('priceInfo.isForGiveaway');
  const price = watch('priceInfo.price');
  const currencySymbol = isDollar ? '$' : '₩';

  const handleCurrencyChange = (toDollar: boolean) => {
    setValue('priceInfo.isDollar', toDollar);
  };

  const handleGiveawayToggle = () => {
    setValue('priceInfo.isForGiveaway', !isForGiveaway);
  };

  // 무료 나눔 체크 시 가격 0으로 설정
  useEffect(() => {
    if (isForGiveaway) {
      setValue('priceInfo.price', 0);
    }
  }, [isForGiveaway, setValue]);

  return (
    <div className="flex flex-col items-start">
      <span className="mb-2 text-[14px] font-bold text-gray-900">가격</span>

      <div className="flex w-full flex-col gap-[14px]">
        {/* TODO : 달러 및 원화 표시 버튼 리팩토링 => 중복된 로직이 너무 많음 */}
        <div className="flex items-center gap-[12px]">
          <div
            className="flex gap-[6px]"
            onClick={() => handleCurrencyChange(false)}
          >
            <button type="button">
              <img
                src={
                  !isDollar
                    ? '/images/svg/register/icon-toggle-radio.svg'
                    : '/images/svg/register/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="원화"
              />
            </button>
            <span className="text-[14px] font-medium leading-[20px] text-blue_gray-900">
              원화
            </span>
          </div>

          <div
            className="flex gap-[6px]"
            onClick={() => handleCurrencyChange(true)}
          >
            <button type="button">
              <img
                src={
                  isDollar
                    ? '/images/svg/register/icon-toggle-radio.svg'
                    : '/images/svg/register/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="달러"
              />
            </button>
            <span className="text-[14px] font-medium leading-[20px] text-blue_gray-900">
              달러
            </span>
          </div>
        </div>

        <div className="relative w-full">
          <span
            className={`absolute left-[16px] top-1/2 -translate-y-1/2 text-[16px] transition-colors duration-150 ${
              price ? 'text-blue_gray-900' : 'text-blue_gray-600'
            }`}
          >
            {currencySymbol}
          </span>

          <input
            type="text"
            placeholder={isForGiveaway ? '0' : '가격을 입력해주세요.'}
            {...register('priceInfo.price', { required: !isForGiveaway })}
            disabled={isForGiveaway}
            value={
              isForGiveaway
                ? ''
                : price && !isDollar
                  ? formatNumber(price)
                  : price || ''
            }
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '');
              setValue('priceInfo.price', Number(rawValue));
            }}
            className="h-[50px] w-full rounded border-[1px] border-solid border-gray-200 bg-white py-[14px] pl-[32px] pr-[16px] text-[16px] font-bold text-blue_gray-900 outline-none placeholder:font-medium placeholder:text-blue_gray-600 disabled:bg-gray-100"
          />
        </div>

        <label className="flex w-fit items-center gap-[6px]">
          <input
            type="checkbox"
            {...register('priceInfo.isForGiveaway')}
            checked={isForGiveaway}
            onChange={handleGiveawayToggle}
            className="sr-only"
          />
          <img
            src={
              isForGiveaway
                ? '/images/svg/home/icon-toggle-radio.svg'
                : '/images/svg/home/icon-toggle-none.svg'
            }
            alt="무료나눔"
          />
          <span className="text-[14px] font-medium leading-[20px] text-blue_gray-900">
            무료나눔
          </span>
        </label>
      </div>
    </div>
  );
}
