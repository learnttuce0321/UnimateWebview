'use client';

import { useQueryClient } from '@tanstack/react-query';
import { UPDATE_USER_INFO } from 'constants/storageSyncKeyFactory/main';
import { useStorageSync } from 'hooks/useStorageSync';
import { API_MY_PROFILE } from 'modules/keyFactory/user';
import { useAppStore } from 'providers/ZustandProvider';
import { User } from 'types/User';

const UserProfileUpdater = () => {
  const queryClient = useQueryClient();
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  useStorageSync(UPDATE_USER_INFO, async () => {
    await queryClient.invalidateQueries({
      queryKey: [API_MY_PROFILE, null],
      refetchType: 'all',
    });
    const userData = queryClient.getQueryData<User>([API_MY_PROFILE, null]);

    if (userData) {
      setUserProfile(userData);
    }
  });

  return null;
};

export default UserProfileUpdater;
