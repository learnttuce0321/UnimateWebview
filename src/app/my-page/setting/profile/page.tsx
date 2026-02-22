'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BottomFixedConfirmButton from 'components/button/BottomFixedConfirmButton';
import NavigationBar from 'components/navigation/NavigationBar';
import { Toast, useToast } from 'components/toast';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import { useMutationCheckNicknameExist } from 'hooks/users/useMutationCheckNicknameExist';
import { useMutationUpdateUserProfile } from 'hooks/users/useMutationUpdateUserProfile';
import { setLocalStorageAndSync } from 'hooks/useStorageSync';
import { ApiResponseError } from 'modules/fetch/fetchClient';
import fetchClient from 'modules/fetch/fetchClient';
import { API_MY_PROFILE } from 'modules/keyFactory/user';
import { useAppStore } from 'providers/ZustandProvider';
import navigationScheme from 'utils/navigationScheme';
import { MyProfile } from 'types/User';
import MyNickname from '../_components/profile/MyNickname';
import MyProfileImage from '../_components/profile/MyProfileImage';

const Page = () => {
  const { data: currentUserProfile, isLoading } = useQuery<MyProfile>({
    queryKey: [API_MY_PROFILE, 'current'],
    queryFn: () => fetchClient.GET({ url: API_MY_PROFILE }),
    staleTime: 0,
  });

  const [userProfile, setUserProfile] = useState<string>('');
  const [userProfileKey, setUserProfileKey] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (currentUserProfile) {
      setUserProfile(currentUserProfile.profileImageUrl || '');
      setUserNickname(currentUserProfile.nickname || '');
    }
  }, [currentUserProfile]);

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

    const updateData: any = { nickname: userNickname };
    if (userProfileKey) {
      updateData.profileImageKey = userProfileKey;
    }

    mutate(updateData, {
      onSuccess: () => {
        setLocalStorageAndSync(UPDATE_USER_INFO, {});
        closeWeb();
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  const handleError = (error: ApiResponseError) => {
    showToast(error.message, 'error');
  };

  if (isLoading) {
    return (
      <>
        <NavigationBar title="프로필 설정" className="bg-white" />
        <div className="flex min-h-full_without_navigation w-full items-center justify-center bg-gray-50 px-[16px] pt-[16px]">
          <div>로딩 중...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavigationBar title="프로필 설정" className="bg-white" />
      <div className="min-h-full_without_navigation w-full bg-gray-50 px-[16px] pt-[16px]">
        <div className="flex h-[188px] w-full items-center justify-center">
          <MyProfileImage
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            setUserProfileKey={setUserProfileKey}
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
