'use client';

import React from 'react';

interface DividerProps {
  className?: string;
}

/**
 * 화면 좌우 padding값과 상관없이 구분선을 추가해주는 컴포넌트
 * @param className
 * 사용처마다 스타일이 조금씩 다를 수 있어서 우선 className이라는 prop을 받도록 하였습니다.
 */

const Divider = ({ className = '' }: DividerProps) => {
  return (
    <div
      className={`relative left-1/2 right-1/2 -mx-[50vw] h-2 w-screen bg-[#fafafa] ${className}`}
    />
  );
};

export default Divider;
