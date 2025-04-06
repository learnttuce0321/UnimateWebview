import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';
import React, { useRef } from 'react';

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
  const isTextarea = type === 'textarea';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // textarea일 때만 자동 높이 조절 훅 사용
  if (isTextarea) {
    useAutoResizeTextarea(textareaRef);
  }

  return (
    <div className="mb-4 mt-[30px] flex flex-col gap-[16px] justify-start">
      <label
        htmlFor={`register-product-${name}`}
        className="text-gray-900 font-bold text-[14px]"
      >
        제목
      </label>
      <div className="flex min-h-[50px] border-[1px] bg-white border-gray-200 border-solid py-[14px] px-[16px] rounded">
        {isTextarea ? (
          <textarea
            id={`register-product-${name}`}
            placeholder={placeholder}
            className="w-full resize-none overflow-hidden outline-none font-[16px]"
            {...register(name, { required })}
            rows={1}
            ref={textareaRef}
          />
        ) : (
          <input
            id={`register-product-${name}`}
            type={type}
            placeholder={placeholder}
            className="w-full outline-none font-[16px]"
            {...register(name, { required })}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
    </div>
  );
}
