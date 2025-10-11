import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_UNIVERSITY_EMAIL_CODE } from 'modules/keyFactory/university';

interface SendEmailCodeParams {
  email: string;
}

export const useMutationSendEmailCode = () => {
  return useMutation<void, ApiResponseError, SendEmailCodeParams>({
    mutationFn: ({ email }) =>
      fetchClient.POST({
        url: API_UNIVERSITY_EMAIL_CODE,
        body: { email },
      }),
  });
};
