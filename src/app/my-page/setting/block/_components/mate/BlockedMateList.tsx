'use client';

import { useRef } from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { Toast, useToast } from 'components/toast';
import { useInfiniteQueryWithObserver } from 'hooks/useInfiniteQueryWithObserver';
import fetchClient, { ApiResponseError } from 'modules/fetch/fetchClient';
import { API_BLOCKED_USERS } from 'modules/keyFactory/user';
import { BlockedUser } from 'types/User';
import BlockedMate from './BlockedMate';
import BlockedMateListError from './BlockedMateListError';
import ScreenLoading from 'components/loading/ScreenLoading';
import ScreenError from 'components/error/ScreenError';

interface BlockedUsersResponse {
  contents: BlockedUser[];
  hasNext: boolean;
  nextCursor: number;
}

const BlockedMateList = () => {
  const infiniteTarget = useRef<HTMLDivElement>(null);

  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { toast, showToast, hideToast } = useToast();

  const {
    data: blockedUsers,
    isLoading,
    isError,
    error,
  } = useInfiniteQueryWithObserver<BlockedUsersResponse, ApiResponseError>(
    infiniteTarget,
    {
      queryKey: [API_BLOCKED_USERS],
      initialPageParam: null,
      queryFn: async ({ pageParam }: any) => {
        try {
          const res = await fetchClient.GET<BlockedUsersResponse>({
            url: API_BLOCKED_USERS,
            params: {
              ...(pageParam && { cursor: pageParam }),
            },
          });

          return res;
        } catch (error) {
          console.log('region product list', error);
          throw error;
        }
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNext) {
          return lastPage.nextCursor;
        }
        return null;
      },
    },
    {
      rootMargin: '0px 0px 50% 0px',
    }
  );

  const blockedUserList = blockedUsers?.pages.flatMap((page) => page.contents);

  if (isError) {
    return (
      <>
        <ScreenError />
        <BlockedMateListError error={error} />
      </>
    );
  }

  if (isLoading) {
    return <ScreenLoading />;
  }

  if (!blockedUserList || !blockedUserList.length) {
    return null;
  }

  return (
    <ul className="[&:not(:last-child)]:border-bg-blue_gray-300 rounded-[10px] bg-white p-[16px] [&:not(:last-child)]:border-b-[0.5px]">
      {blockedUserList.map((blockedUser) => {
        return (
          <BlockedMate
            key={blockedUser.userId}
            blockedUser={blockedUser}
            openModal={openModal}
            showToast={showToast}
          />
        );
      })}
      <div ref={infiniteTarget} />
      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ul>
  );
};

export default BlockedMateList;
