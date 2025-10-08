import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_USER_DELETE_REGION } from 'modules/keyFactory/user';

interface DeleteInterestRegionParams {
  regionId: string;
}

export const useMutationDeleteInterestRegion = () => {
  return useMutation<void, ApiResponseError, DeleteInterestRegionParams>({
    mutationFn: ({ regionId }: DeleteInterestRegionParams) => {
      return fetchClient.DELETE({
        url: API_USER_DELETE_REGION(regionId),
      });
    },
  });
};
