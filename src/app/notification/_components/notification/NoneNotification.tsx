const NoneNotification = () => {
  return (
    <div className="mt-[104px] flex flex-col items-center justify-center gap-[16px]">
      <img
        src="/images/svg/notification/icon-system-notification-fill.svg"
        width={64}
        height={64}
        alt=""
      />
      <p className="text-[18px] font-semibold leading-[21.6px] text-blue_gray-500">
        새로운 알림이 없습니다.
      </p>
    </div>
  );
};

export default NoneNotification;
