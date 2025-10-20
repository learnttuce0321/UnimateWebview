import { headers, cookies } from 'next/headers';
import { dehydrate, DehydratedState } from '@tanstack/react-query';
import { processEnvLocalAccessToken } from 'constants/environments';
import { fetchUserProfile } from 'modules/fetch/fetchUserProfile.server';
import { DeviceInfo } from 'stores/createAppStore';
import { MyProfile } from 'types/User';
import { createSSRQueryClient } from '../react-query/queryClient.server';

interface InitialData {
  initialData: {
    accessToken: string;
    isWebview: boolean;
    isLogin: boolean;
    userProfile: MyProfile | undefined;
    deviceInfo?: DeviceInfo;
  };
  dehydratedState: DehydratedState | undefined;
}

export const getInitialCommonData: () => Promise<InitialData> = async () => {
  const header = headers();
  const cookieStore = cookies();

  const authHeader =
    header.get('Authorization') ??
    processEnvLocalAccessToken ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzYwMjQ5MDA1LCJleHAiOjE3NjI4NDEwMDV9.lZdKUV76vNSAfif0AmBGsZ3742vf0mzcl-o9HmJWLwI';
  // const accessToken = authHeader?.startsWith('Bearer ')
  //   ? authHeader.substring(7)
  //   : authHeader;

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzYwMjQ5MDA1LCJleHAiOjE3NjI4NDEwMDV9.lZdKUV76vNSAfif0AmBGsZ3742vf0mzcl-o9HmJWLwI';
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
