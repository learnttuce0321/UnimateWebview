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
  // TODO : 우선은 제목 form만 했음, 다만 다른 입력 폼들도 props로 구분해서 중복 로직 없도록 할 예정
  return (
    <div className="mb-4 mt-[30px] flex flex-col gap-[16px] justify-start">
      <label
        htmlFor="register-product-title"
        className="text-gray-900 font-bold text-[14px]"
      >
        제목
      </label>
      <div className="h-[50px] border-[1px] bg-white border-gray-200 border-solid py-[14px] px-[16px] rounded ">
        <input
          className="w-full outline-none font-[16px] "
          id="register-product-title"
          type={type}
          placeholder={placeholder}
          {...register(name, { required })}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
