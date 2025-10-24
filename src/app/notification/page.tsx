'use client';

import { useState } from 'react';
import NavigationBar from 'components/navigation/NavigationBar';
import NotificationSettingMenus from './_components/header/NotificationSettingMenus';
import NotificationList from './_components/notification/NotificationList';

const Page = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <>
      <NavigationBar
        title="알림"
        renderOptionButtons={
          <NotificationSettingMenus
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
          />
        }
        className="bg-white"
      />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <NotificationList
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />
      </div>
    </>
  );
};

export default Page;
