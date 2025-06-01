import React from 'react';
import RegisterForm from 'app/inapp/register/_components/registerForm/RegisterForm';
import RegisterHeader from 'app/inapp/register/_components/RegisterHeader';

export default function RegisterPage() {
  return (
    <div className="w-full">
      <RegisterHeader />
      <RegisterForm />
    </div>
  );
}
