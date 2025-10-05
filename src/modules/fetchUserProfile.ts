import { API_MY_PROFILE } from 'modules/keyFactory.user';
import { SSRFetchQuery } from 'modules/queryClient.server';
import { User } from 'types/User';

export const fetchUserProfile = async (
  fetchQuery: SSRFetchQuery,
  accessToken: string | null
) => {
  if (!accessToken) {
    return undefined;
  }

  let userProfile: User | undefined;

  try {
    userProfile = await fetchQuery<User>({
      url: API_MY_PROFILE,
      accessToken,
    });
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }

  return userProfile;
};
