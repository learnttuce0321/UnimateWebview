import { useMutation } from '@tanstack/react-query';
import fetchClient from 'modules/fetchClient';
import { API_USER_DELETE_REGION } from 'modules/keyFactory.user';

interface DeleteInterestRegionParams {
  regionId: string;
}

const requestDeleteInterestRegion = ({
  regionId,
}: DeleteInterestRegionParams) => {
  return fetchClient.POST({
    url: API_USER_DELETE_REGION(regionId),
  });
};

export const useMutationDeleteInterestRegion = () => {
  return useMutation({
    mutationFn: (params: DeleteInterestRegionParams) => {
      return requestDeleteInterestRegion(params);
    },
  });
};
