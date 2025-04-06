'use client';

import React from 'react';
import RegisterInput from './RegisterInput';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import RegisterCategorySelector from './category/RegisterCategorySelector';
import { FormDataType } from '../../_type/registerType';

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
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmit = (data: FormDataType) => {
    console.log('onSubmit 실행!!');
    console.log('123123 data >>', data);
  };

  return (
    <form className="bg-gray-50 p-[16px]" onSubmit={handleSubmit(onSubmit)}>
      <RegisterImageForm />
      <RegisterInput
        type="textarea"
        placeholder="글 제목을 입력해주세요."
        register={register}
        name="title"
        required={true}
        error={errors.title}
      />
      <RegisterCategorySelector setValue={setValue} watch={watch} />
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        제출하기
      </button>
    </form>
  );
}
