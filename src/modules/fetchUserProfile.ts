import { API_MY_PROFILE } from 'modules/keyFactory.user';
import { createSSRQueryClient } from 'modules/queryClient.server';
import { User } from 'types/User';

export const fetchUserProfile = async (accessToken: string | null) => {
  if (!accessToken) {
    return;
  }

  let userProfile: User | undefined;
  const { fetchQuery } = createSSRQueryClient();

  try {
    const userRegionResponse = await fetchQuery<User>({
      url: API_MY_PROFILE,
      accessToken,
    });

    userProfile = userRegionResponse;
  } catch (error) {
    console.error('Failed to fetch user region:', error);
  }

  return userProfile;
};
