'use client';

import React from 'react';
import Modal from 'components/modal/Modal';
import { useModal } from 'components/modal/useModal';
import { useMutationWithdrawUser } from 'hooks/users/useMutationWithdrawUser';
import navigationScheme from 'utils/navigationScheme';
import WithdrawalHeader from './_components/WithdrawalHeader';

const WithdrawalPage = () => {
  const { modalState, openModal, closeModal, handleConfirm, handleCancel } =
    useModal();
  const { mutate: mutateWithdrawUser } = useMutationWithdrawUser();
  const { closeWeb } = navigationScheme();

  const handleWithdrawalConfirm = () => {
    openModal({
      children: (
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-[16px] font-bold leading-[22.4px] text-[#212121]">
            정말로 탈퇴하시겠어요?
          </p>
          <p className="text-[14px] font-medium leading-[16.8px] text-[#666b72]">
            확인 버튼을 누르면 회원탈퇴가 진행됩니다.
          </p>
        </div>
      ),
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        handleWithdrawal();
      },
    });
  };

  const handleWithdrawal = () => {
    mutateWithdrawUser(undefined, {
      onSuccess: () => {
        // 탈퇴 성공 시 웹뷰 닫기
        closeWeb();
      },
      onError: (error) => {
        console.error('회원 탈퇴 실패:', error);
        // 에러 처리
        alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-[#fafafa]">
        <WithdrawalHeader />

        {/* 안내 문구 */}
        <div className="px-4 pt-4">
          <div className="rounded-2xl bg-white px-5 py-6">
            <h2 className="mb-4 text-[18px] font-bold text-[#212121]">
              탈퇴 전에 꼭 확인해주세요!
            </h2>

            <ul className="flex flex-col items-start gap-2 text-[14px] font-normal leading-[20px] text-[#464b52]">
              <li className="flex items-start gap-2">
                <span className="mt-[8px] h-[4px] w-[4px] flex-shrink-0 rounded-full bg-[#464b52]"></span>
                <span>
                  회원 탈퇴가 완료되면 회원님의 개인정보는
                  <br />
                  즉시 파기됩니다.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="mt-[8px] h-[4px] w-[4px] flex-shrink-0 rounded-full bg-[#464b52]"></span>
                <span>활동 이력도 모두 삭제되며, 복구할 수 없습니다.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4">
          <button
            onClick={handleWithdrawalConfirm}
            className="h-[50px] w-full rounded-[10px] bg-[#3c8dff] text-[16px] font-semibold text-white"
          >
            확인했어요
          </button>
        </div>
      </div>

      <Modal
        modalState={modalState}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onOverlayClick={closeModal}
      />
    </>
  );
};

export default WithdrawalPage;
