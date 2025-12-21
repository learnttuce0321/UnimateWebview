'use client';

import { useRef } from 'react';
import { Toast, useToast } from 'components/toast';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_NOTIFICATIONS } from 'modules/keyFactory/notification';
import { Notification as TNotification } from 'types/notification';
import NoneNotification from './NoneNotification';
import Notification from './Notification';
import NotificationDeleteMenu from './NotificationDeleteMenu';
import NotificationListError from './NotificationListError';
import ScreenLoading from 'components/loading/ScreenLoading';
import ScreenError from 'components/error/ScreenError';

interface NotificationsResponse {
  contents: TNotification[];
  hasNext: boolean;
}

interface Props {
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationList = ({ isDeleting, setIsDeleting }: Props) => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const { toast, showToast, hideToast } = useToast();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<NotificationsResponse, ApiResponseError>(
    infiniteTarget,
    {
      queryKey: [API_NOTIFICATIONS],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        try {
          const res = await fetchClient.GET<NotificationsResponse>({
            url: API_NOTIFICATIONS,
            params: {
              pageNumber: pageParam,
            },
          });

          return res;
        } catch (error) {
          console.log('region product list', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext) {
          return allPages.length + 1;
        }
        return null;
      },
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const notificationList = notifications?.pages.flatMap(
    (page) => page.contents
  );

  if (isError) {
    return (
      <>
        <ScreenError />
        <NotificationListError error={error} />
      </>
    );
  }

  if (isLoading) {
    return <ScreenLoading />;
  }

  if (!notificationList || !notificationList.length) {
    return <NoneNotification />;
  }

  return (
    <div>
      <NotificationDeleteMenu
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        showToast={showToast}
      />
      <ul className="flex flex-col gap-[8px]">
        {notificationList.map((notification) => {
          if (!notification) {
            return null;
          }

          return (
            <Notification
              key={notification.id}
              isDeleting={isDeleting}
              notification={notification}
              showToast={showToast}
            />
          );
        })}
      </ul>
      <div ref={infiniteTarget} />
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default NotificationList;
