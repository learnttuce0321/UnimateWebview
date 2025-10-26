'use client';

import navigationScheme from 'utils/navigationScheme';

const NotificationSettingButton = () => {
  const { openWeb } = navigationScheme();

  return (
    <button onClick={() => openWeb('/my-page/setting/notification')}>
      <img
        className="h-[24px] w-[24px]"
        src="/images/svg/notification/icon-system-setting.svg"
        width={24}
        height={24}
        alt="알림 설정"
      />
    </button>
  );
};

export default NotificationSettingButton;
