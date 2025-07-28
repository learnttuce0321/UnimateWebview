import { QueryClient } from '@tanstack/react-query';
import fetchClient from './fetchClient';

interface FetchQueryParams {
  url: string;
  params?: Record<string, any>;
  accessToken?: string;
}

export const createSSRQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        gcTime: 1000 * 60 * 60,
      },
    },
  });

  return {
    queryClient,

    fetchQuery: async <T = unknown>({
      url,
      params,
      accessToken,
    }: FetchQueryParams): Promise<T> => {
      return await queryClient.fetchQuery({
        queryKey: [url, params],
        queryFn: () => fetchClient.GET<T>({ url, params, accessToken }),
      });
    },
  };
};
