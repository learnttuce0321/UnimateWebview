import React from 'react';
import RegisterForm from './_components/registerForm/RegisterForm';
import RegisterHeader from './_components/RegisterHeader';

export default function RegisterPage() {
  return (
    <div className="w-full">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}
