import { useMutation } from '@tanstack/react-query';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_UNIVERSITY_EMAIL_CODE_VERIFY } from 'modules/keyFactory/university';

interface SendEmailCodeParams {
  code: string;
}

export const useMutationVerifyEmailCode = () => {
  return useMutation<void, ApiResponseError, SendEmailCodeParams>({
    mutationFn: ({ code }) =>
      fetchClient.POST({
        url: API_UNIVERSITY_EMAIL_CODE_VERIFY,
        body: { code },
      }),
  });
};
