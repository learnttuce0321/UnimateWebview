import { headers, cookies } from 'next/headers';
import { fetchUserProfile } from 'modules/fetchUserProfile';
import { User } from 'types/User';
import { DeviceInfo } from 'stores/createAppStore';

interface InitialData {
  accessToken: string;
  isWebview: boolean;
  userProfile: User | undefined;
  deviceInfo?: DeviceInfo;
}

export const getInitialCommonData: () => Promise<InitialData> = async () => {
  const header = headers();
  const cookieStore = cookies();

  // 테스트용 하드코딩 토큰
  const hardcodedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ5OTY5MzI0LCJleHAiOjE3NTc3NDUzMjR9.bDpurCfyQ906gPYbPzEnOkzoZpBxLElwXjKY3rwWj9Q';

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

  const userProfile = await fetchUserProfile(accessToken);

  return {
    accessToken,
    isWebview,
    isLogin: !!userProfile,
    userProfile,
    deviceInfo,
  };
};
