import { headers, cookies } from 'next/headers';
import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { processEnvLocalAccessToken } from 'constants/environments';
import { fetchUserProfile } from 'modules/fetch/fetchUserProfile.server';
import { DeviceInfo } from 'stores/createAppStore';
import { User } from 'types/User';
import { createSSRQueryClient } from '../react-query/queryClient.server';

interface InitialData {
  initialData: {
    accessToken: string;
    isWebview: boolean;
    isLogin: boolean;
    userProfile: User | undefined;
    deviceInfo?: DeviceInfo;
  };
  dehydratedState: DehydratedState | undefined;
}

export const getInitialCommonData: () => Promise<InitialData> = async () => {
  const header = headers();
  const cookieStore = cookies();

  const authHeader =
    header.get('Authorization') ?? processEnvLocalAccessToken ?? '';
  const accessToken = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader;

  const isWebview = header.get('IsWebview') === 'true';

  // 쿠키에서 device_info 가져오기
  const deviceInfoCookie = cookieStore.get('device_info');
  let deviceInfo: DeviceInfo | undefined;

  if (deviceInfoCookie?.value) {
    try {
      deviceInfo = JSON.parse(deviceInfoCookie.value) as DeviceInfo;
    } catch (error) {
      console.error('Failed to parse device_info cookie:', error);
      deviceInfo = { device: '', deviceId: '', version: '' };
    }
  }
  const { fetchQuery, queryClient } = createSSRQueryClient();

  const userProfile = await fetchUserProfile(fetchQuery, accessToken);

  return {
    initialData: {
      accessToken,
      isWebview,
      isLogin: !!userProfile,
      userProfile,
      deviceInfo,
    },
    dehydratedState: queryClient ? dehydrate(queryClient) : undefined,
  };
};
