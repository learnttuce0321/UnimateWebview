'use client';

import { useState } from 'react';
import {
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeQueryClient } from 'modules/initializeQueryClient';

const ReactQueryProvider = ({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState?: DehydratedState;
}) => {
  const [queryClient] = useState(() => initializeQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
