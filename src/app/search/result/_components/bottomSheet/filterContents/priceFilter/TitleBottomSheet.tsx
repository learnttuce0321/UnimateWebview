import React from 'react';

interface Props {
  title: string;
}

const TitleBottomSheet = ({ title }: Props) => {
  return (
    <span className="text-[20px] font-bold leading-[20px] text-blue_gray-900">
      {title}
    </span>
  );
};

export default TitleBottomSheet;
