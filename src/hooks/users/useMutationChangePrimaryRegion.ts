import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_USER_PRIMARY_REGION } from 'modules/keyFactory/user';

interface ChangeInterestRegionParams {
  regionId: number;
}

const requestChangeInterestRegion = ({
  regionId,
}: ChangeInterestRegionParams) => {
  return fetchClient.PATCH({
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
