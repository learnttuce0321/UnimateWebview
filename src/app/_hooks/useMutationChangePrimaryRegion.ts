import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetchClient';
import { API_USER_PRIMARY_REGION } from 'modules/keyFactory.user';

interface ChangeInterestRegionParams {
  regionId: string;
}

const requestChangeInterestRegion = ({
  regionId,
}: ChangeInterestRegionParams) => {
  return fetchClient.POST({
    url: API_USER_PRIMARY_REGION(regionId),
  });
};

export const useMutationChangePrimaryRegion = () => {
  return useMutation({
    mutationFn: (params: ChangeInterestRegionParams) => {
      return requestChangeInterestRegion(params);
    },
  });
};
