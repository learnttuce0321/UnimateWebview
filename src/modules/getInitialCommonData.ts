import { headers, cookies } from 'next/headers';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { fetchUserProfile } from 'modules/fetchUserProfile';
import { DeviceInfo } from 'stores/createAppStore';
import { User } from 'types/User';
import { createSSRQueryClient } from './queryClient.server';

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

  // 테스트용 하드코딩 토큰
  const hardcodedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzU3ODU1ODI4LCJleHAiOjE3NjA0NDc4Mjh9.fkgfSSEXMQDEz64Nn0wXfCNaePGUlwOCH0_OrAmCbI4';

  const authHeader = header.get('Authorization') ?? '';
  const accessToken = hardcodedToken; // 하드코딩된 토큰 사용

  console.log('🔐 [HARDCODED] 하드코딩된 토큰 사용:', {
    tokenLength: accessToken.length,
    tokenPreview: `${accessToken.substring(0, 20)}...`,
  });

  // const authHeader = header.get('Authorization') ?? ''; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ5OTY5MzI0LCJleHAiOjE3NTc3NDUzMjR9.bDpurCfyQ906gPYbPzEnOkzoZpBxLElwXjKY3rwWj9Q'
  // const accessToken = authHeader?.startsWith('Bearer ')
  //   ? authHeader.substring(7)
  //   : authHeader;
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
