import { type MutableRefObject } from 'react';
import { DefaultError } from '@tanstack/query-core';
import {
  useInfiniteQuery,
  type UndefinedInitialDataInfiniteOptions,
} from '@tanstack/react-query';
import useIntersectionObserver from './useIntersectionObserver';

export function useInfiniteQueryWithObserver<
  TQueryFnData,
  TError = DefaultError,
>(
  intersectionTarget: MutableRefObject<HTMLElement | null>,
  queryOptions: UndefinedInitialDataInfiniteOptions<TQueryFnData, TError>,
  observerOptions: IntersectionObserverInit
) {
  const result = useInfiniteQuery<TQueryFnData, TError>(queryOptions);

  useIntersectionObserver({
    root: null,
    target: intersectionTarget,
    onIntersect: result.fetchNextPage,
    enabled: result.hasNextPage && !result.isFetching,
    ...observerOptions,
  });

  return result;
}
