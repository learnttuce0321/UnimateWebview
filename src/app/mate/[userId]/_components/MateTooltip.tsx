'use client';

import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const MateTooltip = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block h-[20px]">
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        onBlur={() => setIsVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </button>

      {isVisible && (
        <div className="absolute left-[-20px] top-full z-10 mt-[4px]">
          <div className="relative pt-[7px]">
            {/* 말풍선 꼬리 */}
            <div className="absolute left-[20px] top-0 h-0 w-0 border-b-[8px] border-l-[6px] border-r-[6px] border-b-blue_gray-900/80 border-l-transparent border-r-transparent" />

            {/* 툴팁 내용 */}
            <div className="w-[230px] whitespace-pre-line rounded-[8px] bg-blue_gray-900/80 px-[16px] py-[12px] text-center text-[12px] leading-[18px] text-white shadow-lg">
              <p>학교 이메일 인증을 완료한 유저예요.</p>
              <p>조금 더 안심하고 거래해보세요.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MateTooltip;
