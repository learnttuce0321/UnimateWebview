import React from 'react';

type Props = {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  required?: boolean;
  error?: any;
  errorMessage?: string;
};

export default function RegisterInput({
  type,
  placeholder,
  name,
  register,
  required = false,
  error,
  errorMessage = '입력이 필요합니다.',
}: Props) {
  return (
    <div className="mb-4">
      <div className="border-[1px] border-solid p-2 rounded">
        <input
          className="w-full outline-none"
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
