'use client';

import navigationScheme from 'utils/navigationScheme';

const ProfileSettingButton = () => {
  const { openWeb } = navigationScheme();

  return (
    <button
      onClick={() => {
        openWeb('/my-page/setting');
      }}
    >
      <img
        src="/images/svg/my-page/icon-system-setting.svg"
        alt="닫기"
        width="24"
        height="24"
      />
    </button>
  );
};

export default ProfileSettingButton;
