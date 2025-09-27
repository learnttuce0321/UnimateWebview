'use client';

import navigationScheme from 'utils/navigationScheme';

interface Props {
  title: string;
  targetUrl: string;
}

const MyPageListItem = ({ title, targetUrl }: Props) => {
  const { openWeb } = navigationScheme();

  const handleClick = () => {
    openWeb(targetUrl);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-[56px] w-full items-center justify-between"
    >
      <span className="text-blue_gray-800 text-[14px] leading-[14px]">
        {title}
      </span>
      <img
        src="/images/svg/my-page/icon-arrow-chevron-right.svg"
        width={24}
        height={24}
        alt="더보기"
      />
    </div>
  );
};

export default MyPageListItem;
