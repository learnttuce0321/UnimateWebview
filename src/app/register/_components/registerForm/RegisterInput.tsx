import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';
import React, { useRef } from 'react';

type Props = {
  type: string;
  placeholder: string;
  name: string;
  register: any; // TODO : register의 타입 잡기
  required?: boolean;
  label: string;
};

export default function RegisterInput({
  type,
  placeholder,
  name,
  register,
  required = false,
  label,
}: Props) {
  const isTextarea = type === 'textarea';
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // textarea일 때만 자동 높이 조절 훅 사용
  if (isTextarea) {
    useAutoResizeTextarea(textareaRef);
  }

  return (
    <div className="flex flex-col gap-[16px] justify-start">
      <label
        htmlFor={`register-product-${name}`}
        className="text-gray-900 font-bold text-[14px]"
      >
        {label}
      </label>
      <div className="flex min-h-[50px] border-[1px] bg-white border-gray-200 border-solid py-[14px] px-[16px] rounded">
        {isTextarea ? (
          <textarea
            id={`register-product-${name}`}
            placeholder={placeholder}
            className="w-full resize-none overflow-hidden outline-none font-[16px] placeholder:font-medium placeholder:text-blue_gray-600"
            rows={1}
            {...register(name, { required })}
            ref={(el) => {
              register(name, { required }).ref(el);
              textareaRef.current = el;
            }}
          />
        ) : (
          <input
            id={`register-product-${name}`}
            type={type}
            placeholder={placeholder}
            className="w-full outline-none font-[16px] placeholder:font-medium placeholder:text-blue_gray-600"
            {...register(name, { required })}
          />
        )}
      </div>
    </div>
  );
}
