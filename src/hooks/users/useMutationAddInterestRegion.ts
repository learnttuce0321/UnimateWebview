import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetch/fetchClient';
import { API_USER_REGION } from 'modules/keyFactory/user';

interface AddInterestRegionParams {
  regionId: number;
}

const requestAddInterestRegion = (body: AddInterestRegionParams) => {
  return fetchClient.POST({
    url: API_USER_REGION,
    body,
  });
};

export const useMutationAddInterestRegion = () => {
  return useMutation({
    mutationFn: (body: AddInterestRegionParams) => {
      return requestAddInterestRegion(body);
    },
  });
};
