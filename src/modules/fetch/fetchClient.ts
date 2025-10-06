import { processEnvBaseUrl } from 'constants/environments';
import deviceInfoStore from 'stores/vanillaStore.deviceInfo';

export interface ApiRequest {
  url: string;
  params?: Record<string, any> | null;
  body?: Record<string, any>;
  accessToken?: string;
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
    { url, params, accessToken }: ApiRequest,
    init: Omit<RequestInit, 'credentials' | 'method'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, accessToken },
      { method: 'GET', ...init }
    );
  };

  const POST = async <TResponse = unknown>(
    { url, params, body, accessToken }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body, accessToken },
      { method: 'POST', ...init }
    );
  };

  const PUT = async <TResponse = unknown>(
    { url, params, body, accessToken }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body, accessToken },
      { method: 'PUT', ...init }
    );
  };

  const PATCH = async <TResponse = unknown>(
    { url, params, body, accessToken }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body, accessToken },
      { method: 'PATCH', ...init }
    );
  };

  const DELETE = async <TResponse = unknown>(
    { url, params, body, accessToken }: ApiRequest,
    init: Omit<RequestInit, 'credentials'> = {}
  ) => {
    return await request<TResponse>(
      { url, params, body, accessToken },
      { method: 'DELETE', ...init }
    );
  };

  return {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
  };
};
export default fetchClient();

/**
 * @description Fetch API를 사용하여 HTTP 요청을 보내는 함수입니다. 호출하는 위치에 따라 에러 리턴이 다릅니다.
 */
const request = async <TResponse>(
  { url, params, body, accessToken }: ApiRequest,
  init: Omit<RequestInit, 'credentials'> = {}
) => {
  const token =
    accessToken ?? deviceInfoStore.getState().deviceInfo.accessToken;

  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
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

    if (response.status === 204) {
      return {} as TResponse;
    }

    // 200 응답이지만 body가 비어있는 경우 처리
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');

    if (
      contentLength === '0' ||
      !contentType ||
      !contentType.includes('application/json')
    ) {
      return {} as TResponse;
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

    throw errorResponse;
  }
};

type GeneratedUrlWithParams = {
  url: string;
  params?: Record<string, any> | null;
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
