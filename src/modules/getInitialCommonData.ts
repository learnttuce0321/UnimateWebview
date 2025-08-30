import { headers } from 'next/headers';
import { fetchUserProfile } from 'modules/fetchUserProfile';
import { User } from 'types/User';

interface InitialData {
  accessToken: string;
  isWebview: boolean;
  userProfile: User | undefined;
}

export const getInitialCommonData: () => Promise<InitialData> = async () => {
  const header = headers();

  const authHeader =
    header.get('Authorization') ??
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ5OTY5MzI0LCJleHAiOjE3NTc3NDUzMjR9.bDpurCfyQ906gPYbPzEnOkzoZpBxLElwXjKY3rwWj9Q'; // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ5OTY5MzI0LCJleHAiOjE3NTc3NDUzMjR9.bDpurCfyQ906gPYbPzEnOkzoZpBxLElwXjKY3rwWj9Q'
  const accessToken = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader;
  const isWebview = header.get('IsWebview') === 'true';

  const userProfile = await fetchUserProfile(accessToken);

  return {
    accessToken,
    isWebview,
    isLogin: !!userProfile,
    userProfile,
  };
};
