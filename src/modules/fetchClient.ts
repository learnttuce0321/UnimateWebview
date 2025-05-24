import { processEnvBaseUrl } from '@/constant/environments';

export interface ApiResponse {
  status: number;
  code: string;
}

export type ApiResponseError = ApiResponse & {
  message: string;
  isError: boolean;
};

export const fetchClient = async <TResponse>(
  url: string,
  init: Omit<RequestInit, 'credentials'> = {}
) => {
  // TODO: vanilla/zustand를 통해 accessToken 가져오기
  // const accessToken = sessionStore.getState().getAccessToken();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ2OTY1NzQ1LCJleHAiOjE3NDk1NTc3NDV9.ARlNELfX283BKEmgaz6jZCTgVo_yUPdL4-s5fWutn38';

  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  console.log('processEnvBaseUrl', processEnvBaseUrl);
  console.log('fetchClient url', url);
  const response = await fetch(`${processEnvBaseUrl}${url}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    console.log('[ERROR]', response);

    const errorResponse: ApiResponseError = {
      status: response.status,
      code: response.statusText,
      message: response.statusText,
      isError: true,
    };

    return errorResponse;
  }

  const data: TResponse = await response.json();
  return data;
};
