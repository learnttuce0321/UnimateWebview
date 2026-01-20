'use client';

import navigationScheme from 'utils/navigationScheme';

const AccountActions = () => {
  const { openWeb, logout } = navigationScheme();

  const handleLogout = () => {
    logout();
  };

  const handleWithdrawal = () => {
    openWeb('/withdrawal');
  };

  return (
    <div className="rounded-[10px] bg-white px-[16px] py-[8px]">
      <button
        onClick={handleLogout}
        className="flex h-[48px] w-full items-center border-b-[0.5px] border-blue_gray-300"
      >
        <span className="text-[14px] leading-[14px] text-blue_gray-500">
          로그아웃
        </span>
      </button>
      <button
        onClick={handleWithdrawal}
        className="flex h-[48px] w-full items-center"
      >
        <span className="text-[14px] leading-[14px] text-blue_gray-500">
          회원 탈퇴
        </span>
      </button>
    </div>
  );
};

export default AccountActions;
