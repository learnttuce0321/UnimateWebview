'use client';

import { useEffect, useState } from 'react';

const ScreenLoading = () => {
  const colors = [
    '#3b7aeb',
    '#3c8dff',
    '#3b9cff',
    '#4eabff',
    '#6cbbff',
    '#96cfff',
    '#bee1ff',
    '#e6f1ff',
  ];

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % colors.length);
    }, 125); // 1초에 8번 변경 (125ms * 8 = 1000ms)

    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="relative h-[70px] w-[70px]">
        {colors.map((_, index) => {
          const angle = (index * 360) / colors.length;
          const colorIndex = (index - rotation + colors.length) % colors.length;
          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(19px)`,
                transformOrigin: 'center',
              }}
            >
              <div
                className="h-4 w-1.5 rounded-full transition-colors duration-150"
                style={{
                  backgroundColor: colors[colorIndex],
                }}
              />
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[16px] font-semibold leading-[24px] text-blue_gray-700">
        Loading...
      </p>
    </div>
  );
};

export default ScreenLoading;
