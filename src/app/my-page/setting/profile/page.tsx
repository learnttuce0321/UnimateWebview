'use client';

import { useState } from 'react';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import NavigationBar from 'components/navigation/NavigationBar';
import { Toast, useToast } from 'components/toast';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import { useMutationCheckNicknameExist } from 'hooks/users/useMutationCheckNicknameExist';
import { useMutationUpdateUserProfile } from 'hooks/users/useMutationUpdateUserProfile';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { ApiResponseError } from 'modules/fetch/fetchClient';
import { useAppStore } from 'providers/ZustandProvider';
import navigationScheme from 'utils/navigationScheme';
import MyNickname from '../_components/profile/MyNickname';
import MyProfileImage from '../_components/profile/MyProfileImage';

const Page = () => {
  const profileImageUrl = useAppStore(
    (state) => state.userProfile.profileImageUrl
  );
  const nickname = useAppStore((state) => state.userProfile.nickname);
  const [userProfile, setUserProfile] = useState<string>(profileImageUrl);
  const [userNickname, setUserNickname] = useState<string>(nickname);
  const { toast, showToast, hideToast } = useToast();

  const { mutateAsync } = useMutationCheckNicknameExist();
  const { mutate } = useMutationUpdateUserProfile();
  const { closeWeb } = navigationScheme();

  const handleUpdateUserProfile = async () => {
    try {
      const { exists } = await mutateAsync({ nickname: userNickname });

      if (exists) {
        throw { message: '동일한 닉네임이 존재합니다.' };
      }
    } catch (error: any) {
      handleError(error);
      return;
    }

    mutate(
      { nickname: userNickname, profileImageKey: userProfile },
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
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
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
