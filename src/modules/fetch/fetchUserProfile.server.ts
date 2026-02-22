import { API_MY_PROFILE } from 'modules/keyFactory/user';
import { SSRFetchQuery } from 'modules/react-query/queryClient.server';
import { MyProfile } from 'types/User';

export const fetchUserProfile = async (
  fetchQuery: SSRFetchQuery,
  accessToken: string | null
) => {
  if (!accessToken) {
    return undefined;
  }

  let userProfile: MyProfile | undefined;

  try {
    userProfile = await fetchQuery<MyProfile>({
      url: API_MY_PROFILE,
      accessToken,
    });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }

  return userProfile;
};
