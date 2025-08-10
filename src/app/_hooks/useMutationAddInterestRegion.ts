import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetchClient';
import { API_USER_REGION } from 'modules/keyFactory.user';

interface AddInterestRegionParams {
  regionId: string;
}

const requestAddInterestRegion = (params: AddInterestRegionParams) => {
  return fetchClient.POST({
    url: API_USER_REGION,
    params,
  });
};

export const useMutationAddInterestRegion = () => {
  return useMutation({
    mutationFn: (params: AddInterestRegionParams) => {
      return requestAddInterestRegion(params);
    },
  });
};
