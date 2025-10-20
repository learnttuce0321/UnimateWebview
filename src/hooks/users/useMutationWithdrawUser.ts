import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_USER_WITHDRAWAL } from 'modules/keyFactory/user';

export const useMutationWithdrawUser = () => {
  return useMutation<void, ApiResponseError, void>({
    mutationFn: () =>
      fetchClient.DELETE({
        url: API_USER_WITHDRAWAL,
      }),
  });
};
