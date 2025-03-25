import React from 'react';
import RegisterImageForm from './RegisterImageForm';
import RegisterInput from './RegisterInput';
import RegisterCategoryInput from './RegisterCategoryInput';

export default function RegisterForm() {
  return (
    <form className="bg-gray-50 p-[16px]">
      <RegisterImageForm />
      <RegisterInput type="text" placeholder="글 제목을 입력해주세요." />
      <RegisterCategoryInput />
      {/* <RegisterInput type=''/> */}
      {/* <RegisterInput /> */}
      {/* <RegisterInput /> */}
    </form>
  );
}
