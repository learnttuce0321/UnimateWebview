'use client';

import React from 'react';
import RegisterInput from './RegisterInput';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import RegisterCategorySelector from './category/RegisterCategorySelector';
import { FormDataType } from '../../_type/registerType';
import RegisterPriceInfo from './price/RegisterPriceInfo';

// RegisterImageForm을 클라이언트 전용으로 불러오기 (SSR mismatch 에러)
const RegisterImageForm = dynamic(() => import('./RegisterImageForm'), {
  ssr: false,
});

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
      className="flex flex-col gap-[30px] bg-gray-50 first-letter:bg-gray-50 p-[16px]"
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
      <RegisterCategorySelector
        register={register}
        setValue={setValue}
        watch={watch}
      />
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
      <button
        type="submit"
        disabled={!isValid}
        className="mt-4 w-full h-[50px] bg-blue-600_P text-white p-2 rounded-[10px] disabled:bg-blue_gray-500"
      >
        등록하기
      </button>
    </form>
  );
}
