import { FormDataType } from '@/app/register/_type/registerType';
import { useEffect } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

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
        <div className="flex items-center gap-[12px]">
          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(false)}>
              <img
                src={
                  !isDollar
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                alt="원화"
              />
            </button>
            <span>원화</span>
          </div>
          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(true)}>
              <img
                src={
                  isDollar
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                alt="달러"
              />
            </button>
            <span>달러</span>
          </div>
        </div>

        <input
          type="number"
          {...register('priceInfo.price', { required: !isForGiveaway })}
          disabled={isForGiveaway}
          value={isForGiveaway ? '0' : price || ''}
          onChange={(e) => setValue('priceInfo.price', Number(e.target.value))}
          className="w-full h-[50px] outline-none font-[16px] border-[1px] bg-white border-gray-200 border-solid py-[14px] px-[16px] rounded"
        />

        <label>
          <input
            type="checkbox"
            {...register('priceInfo.isForGiveaway')}
            checked={isForGiveaway}
            onChange={handleGiveawayToggle}
          />
          무료나눔
        </label>
      </div>
    </div>
  );
}
