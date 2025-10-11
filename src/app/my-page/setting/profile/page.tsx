'use client';

import NavigationBar from 'components/navigation/NavigationBar';
import MyNickname from '../_components/profile/MyNickname';
import MyProfileImage from '../_components/profile/MyProfileImage';
import { useMutationUpdateUserProfile } from 'hooks/users/useMutationUpdateUserProfile';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import navigationScheme from 'utils/navigationScheme';
import { Toast, useToast } from 'components/toast';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import { useState } from 'react';
import { useAppStore } from 'providers/ZustandProvider';
import { ApiResponseError } from 'modules/fetch/fetchClient';

const Page = () => {
  const profileImageUrl = useAppStore(
    (state) => state.userProfile.profileImageUrl
  );
  const nickname = useAppStore((state) => state.userProfile.nickname);
  const [userProfile, setUserProfile] = useState<string>(profileImageUrl);
  const [userNickname, setUserNickname] = useState<string>(nickname);
  const { toast, showToast, hideToast } = useToast();

  const { mutate } = useMutationUpdateUserProfile();
  const { closeWeb } = navigationScheme();

  const handleUpdateUserProfile = () => {
    mutate(
      { nickname: userNickname, profileImageUrl: userProfile },
      {
        onSuccess: () => {
          setLocalStorageAndSync(UPDATE_USER_INFO, {});
          closeWeb();
        },
        onError: (error) => {
          handleError(error);
        },
      }
    );
  };

  const handleError = (error: ApiResponseError) => {
    showToast(error.message, 'error');
  };

  return (
    <>
      <NavigationBar title="프로필 설정" className="bg-white" />
      <div className="min-h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[16px]">
        <div className="flex h-[188px] w-full items-center justify-center">
          <MyProfileImage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            handleError={handleError}
          />
        </div>
        <MyNickname
          userNickname={userNickname}
          setUserNickname={setUserNickname}
        />
        <BottomFixedConfirmButton
          buttonText="확인"
          onClick={handleUpdateUserProfile}
          isActive={!!userNickname}
        />
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
};

export default Page;
