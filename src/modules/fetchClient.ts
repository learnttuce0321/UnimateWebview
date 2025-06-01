import { processEnvBaseUrl } from 'constants/environments';

export interface ApiRequest {
  url: string;
  params?: Record<string, any>;
  body?: Record<string, any>;
}
export interface ApiResponse {
  status: number;
  code: string;
}

export interface ApiResponseError extends ApiResponse {
  message: string;
  isError: boolean;
}

const fetchClient = () => {
  const GET = async <TResponse = unknown>(
    { url, params }: ApiRequest,
    init: Omit<RequestInit, 'credentials' | 'method'> = {}
  ) => {
    return await request<TResponse>(
      { url, params },
      { method: 'GET', ...init }
    );
  };

  const POST = async <TResponse = unknown>(
    { url, params, body }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body },
      { method: 'POST', ...init }
    );
  };

  const PUT = async <TResponse = unknown>(
    { url, params, body }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body },
      { method: 'PUT', ...init }
    );
  };
  const DELETE = async <TResponse = unknown>(
    { url, params, body }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body },
      { method: 'DELETE', ...init }
    );
  };

  return {
    GET,
    POST,
    PUT,
    DELETE,
  };
};
export default fetchClient();

/**
 * @description Fetch API를 사용하여 HTTP 요청을 보내는 함수입니다. 호출하는 위치에 따라 에러 리턴이 다릅니다.
 */
const request = async <TResponse>(
  { url, params, body }: ApiRequest,
  init: Omit<RequestInit, 'credentials'> = {}
) => {
  // TODO: vanilla/zustand를 통해 accessToken 가져오기
  // const accessToken = sessionStore.getState().getAccessToken();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInByb3ZpZGVyIjoiS0FLQU8iLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNzQ2OTY1NzQ1LCJleHAiOjE3NDk1NTc3NDV9.ARlNELfX283BKEmgaz6jZCTgVo_yUPdL4-s5fWutn38';

  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(
      `${processEnvBaseUrl}${generateURLWithParams({ url: url, params: params })}`,
      {
        ...init,
        ...(body && { body: JSON.stringify(body) }),
        headers,
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw response;
    }

    const data: TResponse = await response.json();
    return data;
  } catch (error: any) {
    console.log('[ERROR]', error);

    const errorResponse: ApiResponseError = {
      status: error.status,
      code: error.statusText,
      message: error.statusText,
      isError: true,
    };

    const isServer = typeof window === 'undefined';

    if (isServer) {
      return errorResponse;
    } else {
      throw errorResponse;
    }
  }
};

type GeneratedUrlWithParams = {
  url: string;
  params?: Record<string, any>;
};

export const generateURLWithParams = ({
  url,
  params,
}: GeneratedUrlWithParams) => {
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    return `${url}?${searchParams.toString()}`;
  }

  return url;
};
