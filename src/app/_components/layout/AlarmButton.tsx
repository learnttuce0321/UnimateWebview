'use client';

import navigationScheme from 'utils/navigationScheme';

const AlarmButton = () => {
  const { openWeb } = navigationScheme();

  return (
    <button onClick={() => openWeb('/notification')}>
      <img
        src="/images/svg/home/icon-system-notification.svg"
        alt="알림 아이콘"
        width="24"
        height="24"
      />
    </button>
  );
};

export default AlarmButton;
