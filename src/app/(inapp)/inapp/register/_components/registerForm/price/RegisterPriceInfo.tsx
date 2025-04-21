import { useEffect } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormDataType } from 'app/(inapp)/inapp/register/_type/registerType';

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
      <span className="text-gray-900 font-bold text-[14px] mb-[16px]">
        가격
      </span>

      <div className="flex flex-col gap-[14px] w-full">
        {/* TODO : 달러 및 원화 표시 버튼 리팩토링 => 중복된 로직이 너무 많음 */}
        <div className="flex items-center gap-[12px]">
          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(false)}>
              <img
                src={
                  !isDollar
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="원화"
              />
            </button>
            <span className="font-medium text-[14px] leading-[20px] text-blue_gray-900">
              원화
            </span>
          </div>
          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(true)}>
              <img
                src={
                  isDollar
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="달러"
              />
            </button>
            <span className="font-medium text-[14px] leading-[20px] text-blue_gray-900">
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
            type="number"
            placeholder={isForGiveaway ? '0' : '가격을 입력해주세요.'}
            {...register('priceInfo.price', { required: !isForGiveaway })}
            disabled={isForGiveaway}
            value={isForGiveaway ? '' : price || ''}
            onChange={(e) =>
              setValue('priceInfo.price', Number(e.target.value))
            }
            className="w-full h-[50px] pl-[32px] pr-[16px] outline-none text-[16px] font-bold text-blue_gray-900 border-[1px] border-solid py-[14px] rounded placeholder:font-medium placeholder:text-blue_gray-600 disabled:bg-gray-100 bg-white border-gray-200"
          />
        </div>

        <label className="w-fit flex items-center gap-[6px]">
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
                ? '/images/svg/icon-toggle-radio.svg'
                : '/images/svg/icon-toggle-none.svg'
            }
            alt="무료나눔"
          />
          <span className="font-medium text-[14px] leading-[20px] text-blue_gray-900">
            무료나눔
          </span>
        </label>
      </div>
    </div>
  );
}
