import React from 'react';
import RegisterHeader from './_components/RegisterHeader';
import RegisterForm from './_components/registerForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="w-full p-[16px]">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}
