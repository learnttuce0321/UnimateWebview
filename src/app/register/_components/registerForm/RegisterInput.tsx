import React, { useRef } from 'react';
import { useAutoResizeTextarea } from 'hooks/useAutoResizeTextarea';

type Props = {
  type: string;
  placeholder: string;
  name: string;
  register: any; // TODO : register의 타입 잡기
  required?: boolean;
  label?: string;
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
  const registerProps = register(name, { required });

  useAutoResizeTextarea(textareaRef);

  return (
    <div className="flex flex-col justify-start gap-[16px]">
      {label && (
        <label
          htmlFor={`register-product-${name}`}
          className="text-[14px] font-bold text-gray-900"
        >
          {label}
        </label>
      )}
      <div
        className={`flex ${
          name === 'desc' ? 'min-h-[120px]' : 'min-h-[50px]'
        } rounded border-[1px] border-solid border-gray-200 bg-white px-[16px] py-[14px]`}
      >
        {isTextarea ? (
          <textarea
            id={`register-product-${name}`}
            placeholder={placeholder}
            className="w-full resize-none overflow-hidden font-[16px] outline-none placeholder:font-medium placeholder:text-blue_gray-600"
            rows={1}
            {...registerProps}
            ref={(el) => {
              registerProps.ref(el);
              textareaRef.current = el;
            }}
          />
        ) : (
          <input
            id={`register-product-${name}`}
            type={type}
            placeholder={placeholder}
            className="w-full font-[16px] outline-none placeholder:font-medium placeholder:text-blue_gray-600"
            {...register(name, { required })}
          />
        )}
      </div>
    </div>
  );
}
