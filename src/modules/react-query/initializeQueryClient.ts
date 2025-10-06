import { QueryClient, QueryKey } from '@tanstack/react-query';
import fetchClient from '../fetch/fetchClient';

const defaultQueryFn = async (queryKey: QueryKey) => {
  if (!Array.isArray(queryKey) || typeof queryKey[0] !== 'string') {
    throw new Error('Invalid queryKey format. Expected [url, params] tuple.');
  }

  const [url, params] = queryKey as [string, Record<string, any>?];

  const response = await fetchClient.GET({ url, params });
  return response;
};

export const initializeQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: ({ queryKey }) => defaultQueryFn(queryKey),
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        gcTime: 1000 * 60 * 60,
      },
    },
  });
