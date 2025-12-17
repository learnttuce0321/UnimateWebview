'use client';

import { useQuery } from '@tanstack/react-query';
import { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_NOTIFICATION_SETTING } from 'modules/keyFactory/notification';
import { NotificationSetting } from 'types/notification';
import NotificationListError from './NotificationListError';
import TradingNotificationList from './TradingNotificationList';
import ScreenLoading from 'components/loading/ScreenLoading';

const TradingNotificationSection = () => {
  const {
    data: notification,
    isLoading,
    isError,
    error,
  } = useQuery<NotificationSetting, ApiResponseError>({
    queryKey: [API_NOTIFICATION_SETTING],
  });

  if (isError) {
    return <NotificationListError error={error} />;
  }

  if (isLoading) {
    return <ScreenLoading />;
  }

  if (!notification) {
    return null;
  }

  return (
    <div className="w-full rounded-[10px] bg-white p-[16px]">
      <h2 className="mb-[8px] text-[16px] font-bold leading-[16px] text-blue_gray-900">
        거래 활동
      </h2>
      <TradingNotificationList notification={notification} />
    </div>
  );
};

export default TradingNotificationSection;
