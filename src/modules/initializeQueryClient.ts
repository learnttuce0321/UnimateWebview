import { QueryClient } from '@tanstack/react-query';

export const initializeQueryClient = (): QueryClient =>
  new QueryClient({
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
