import { InfiniteData, useQueryClient } from '@tanstack/react-query';

interface PageResponse<T> {
  contents: (T | null)[];
  hasNext: boolean;
}

export const useUpdateQueryData = () => {
  const queryClient = useQueryClient();

  const queryDataUpdate = <TItem>(
    queryKey: any[],
    updater: (item: TItem) => TItem
  ) => {
    queryClient.setQueryData<TItem>(queryKey, (oldData) => {
      if (!oldData) return oldData;
      return updater(oldData);
    });
  };

  const infiniteQueryDataUpdater = <TItem>(
    queryKey: any[],
    conditionalUpdater: (item: TItem) => TItem | null
  ) => {
    queryClient.setQueryData<InfiniteData<PageResponse<TItem>>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            contents: page.contents.map((item) => conditionalUpdater(item!)),
          })),
        };
      }
    );
  };

  return { queryDataUpdate, infiniteQueryDataUpdater };
};
