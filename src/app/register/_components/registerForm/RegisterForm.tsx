'use client';

import React from 'react';
import RegisterImageForm from './RegisterImageForm';
import RegisterInput from './RegisterInput';
import { useForm } from 'react-hook-form';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO : 임시로 타입 any 설정
  const onSubmit = (data: any) => {
    console.log('123123 data >>', data);
  };

  return (
    <form className="bg-gray-50 p-[16px]" onSubmit={handleSubmit(onSubmit)}>
      <RegisterImageForm />
      <RegisterInput
        type="text"
        placeholder="글 제목을 입력해주세요."
        register={register}
        name="title"
        required={true}
        error={errors.title}
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        제출하기
      </button>
    </form>
  );
}
