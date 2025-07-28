import { API_USER_REGION } from 'modules/keyFactory.user';
import { createSSRQueryClient } from 'modules/queryClient.server';
import { UserInterestRegions } from '../../types/Region';

export const fetchUserInterestRegion = async (accessToken: string | null) => {
  if (!accessToken) {
    return [];
  }

  let userRegion: UserInterestRegions = [];
  const { fetchQuery } = createSSRQueryClient();

  try {
    userRegion = await fetchQuery<UserInterestRegions>({
      url: API_USER_REGION,
      accessToken,
    });
  } catch (error) {
    console.error('Failed to fetch user region:', error);
  }

  return userRegion;
};
