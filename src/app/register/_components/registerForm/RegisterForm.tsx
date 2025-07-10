'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import RegisterCategorySelector from 'app/register/_components/registerForm/category/RegisterCategorySelector';
import RegisterPriceInfo from 'app/register/_components/registerForm/price/RegisterPriceInfo';
import RegisterInput from 'app/register/_components/registerForm/RegisterInput';
import RegisterTradeInfo from 'app/register/_components/registerForm/trade/RegisterTradeInfo';
import { FormDataType } from 'app/register/_type/registerType';

// RegisterImageForm을 클라이언트 전용으로 불러오기 (SSR mismatch 에러)
const RegisterImageForm = dynamic(
  () => import('app/register/_components/registerForm/RegisterImageForm'),
  {
    ssr: false,
  }
);

export default function RegisterForm() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormDataType>();

  const onSubmit = (data: FormDataType) => {
    console.log('onSubmit 실행!!');
    console.log('123123 data >>', data);
  };

  return (
    <form
      className="flex flex-col gap-[30px] bg-gray-50 p-[16px] first-letter:bg-gray-50"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterImageForm />
      <RegisterInput
        type="textarea"
        placeholder="글 제목을 입력해주세요."
        register={register}
        name="title"
        required={true}
        label="제목"
      />
      {/* TODO: useForm의 메소드들을 따로 보내지말고 useFormContext()를 사용해서 보내도록 수정예정 */}
      <RegisterCategorySelector setValue={setValue} watch={watch} />
      <RegisterPriceInfo
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <RegisterInput
        type="textarea"
        placeholder={`상품에 대한 자세한 설명을 적어주세요.\n자세히 작성할수록 판매 확률이 올라갑니다!`}
        register={register}
        name="desc"
        required={true}
        label="상품 설명"
      />
      <RegisterTradeInfo
        register={register}
        setValue={setValue}
        watch={watch}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="mt-4 h-[50px] w-full rounded-[10px] bg-blue-600_P p-2 text-white disabled:bg-blue_gray-500"
      >
        등록하기
      </button>
    </form>
  );
}
