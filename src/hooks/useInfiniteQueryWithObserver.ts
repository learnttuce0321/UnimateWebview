import { type MutableRefObject } from 'react';
import {
  useInfiniteQuery,
  type UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';
import useIntersectionObserver from './useIntersectionObserver';

export function useInfiniteQueryWithObserver<TQueryFnData>(
  intersectionTarget: MutableRefObject<HTMLElement | null>,
  queryOptions: UndefinedInitialDataInfiniteOptions<TQueryFnData>,
  observerOptions: IntersectionObserverInit
) {
  const result = useInfiniteQuery<TQueryFnData>(queryOptions);

  useIntersectionObserver({
    root: null,
    target: intersectionTarget,
    onIntersect: result.fetchNextPage,
    enabled: result.hasNextPage && !result.isFetching,
    ...observerOptions,
  });

  return result;
}
