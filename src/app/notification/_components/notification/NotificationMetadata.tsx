'use client';

import { NotificationType } from 'types/notification';
import { formatTimeAgo } from 'utils/formatTime';

interface Props {
  isRead: boolean;
  notificationType: NotificationType;
  createdAt: string;
}

const getNotificationIconByType = (
  isRead: boolean,
  notificationType: NotificationType
) => {
  if (isRead) {
    return notificationType === 'SALE_ENDED'
      ? '/images/svg/notification/read-soldout-icon.svg'
      : '/images/svg/notification/read-icon-toggle-favorite.svg';
  } else {
    return notificationType === 'SALE_ENDED'
      ? '/images/svg/notification/soldout-icon.svg'
      : '/images/svg/notification/icon-toggle-favorite.svg';
  }
};

const getNotificationTextByType = (notificationType: NotificationType) => {
  return notificationType === 'SALE_ENDED' ? '판매종료' : '가격변동';
};

const NotificationMetadata = ({
  isRead,
  notificationType,
  createdAt,
}: Props) => {
  return (
    <div className="flex items-center">
      <img
        className="mr-[6px]"
        src={getNotificationIconByType(isRead, notificationType)}
        width={24}
        height={24}
        alt=""
      />
      <span
        className={`${isRead ? 'text-blue_gray-500' : 'text-blue_gray-600'} mr-[6px] text-[14px] leading-[16.8px]`}
      >
        {getNotificationTextByType(notificationType)}
      </span>
      <span className="mr-[6px]"> · </span>
      <span className="text-[12px] leading-[14.4px] text-blue_gray-400">
        {formatTimeAgo(createdAt)}
      </span>
    </div>
  );
};

export default NotificationMetadata;
