import React from 'react';

type Props = {
  type: string;
  placeholder: string;
};

export default function RegisterInput({ type, placeholder }: Props) {
  return (
    <div className="border-[1px] border-solid">
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
