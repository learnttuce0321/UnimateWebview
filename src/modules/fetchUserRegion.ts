import { API_USER_REGION } from 'modules/keyFactory.user';
import { createSSRQueryClient } from 'modules/queryClient.server';
import { Region } from 'types/Region';

export const fetchUserInterestRegion = async (accessToken: string | null) => {
  if (!accessToken) {
    return [];
  }

  let userRegion: Region[] = [];
  const { fetchQuery } = createSSRQueryClient();

  try {
    const userRegionResponse = await fetchQuery<{
      interestRegions: Region[];
    }>({
      url: API_USER_REGION,
      accessToken,
    });

    userRegion = userRegionResponse.interestRegions;
  } catch (error) {
    console.error('Failed to fetch user region:', error);
  }

  return userRegion;
};
