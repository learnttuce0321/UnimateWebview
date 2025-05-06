import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormDataType } from 'app/inapp/register/_type/registerType';
import RegisterInput from '../RegisterInput';

type Props = {
  register: UseFormRegister<FormDataType>;
  setValue: UseFormSetValue<FormDataType>;
  watch: UseFormWatch<FormDataType>;
};

export default function RegisterTradeInfo({
  register,
  setValue,
  watch,
}: Props) {
  const isRemote = watch('tradeInfo.isRemote');

  const handleCurrencyChange = (isRemote: boolean) => {
    setValue('tradeInfo.isRemote', isRemote);
  };

  return (
    <div className="flex flex-col items-start">
      <span className="text-gray-900 font-bold text-[14px] mb-[16px]">
        거래 방식
      </span>

      <div className="flex flex-col gap-[14px] w-full">
        <div className="flex items-center gap-[12px]">
          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(false)}>
              <img
                src={
                  !isRemote
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="직거래"
              />
            </button>
            <span className="font-medium text-[14px] leading-[20px] text-blue_gray-900">
              직거래
            </span>
          </div>

          <div className="flex gap-[6px]">
            <button type="button" onClick={() => handleCurrencyChange(true)}>
              <img
                src={
                  isRemote
                    ? '/images/svg/icon-toggle-radio.svg'
                    : '/images/svg/icon-toggle-radio-none.svg'
                }
                className="rounded-full"
                alt="비대면거래"
              />
            </button>
            <span className="font-medium text-[14px] leading-[20px] text-blue_gray-900">
              비대면거래
            </span>
          </div>
        </div>

        <RegisterInput
          type="textarea"
          placeholder="거래 희망 장소를 입력해주세요."
          register={register}
          name="tradeInfo.tradeLocation"
          required={true}
        />
      </div>
    </div>
  );
}
