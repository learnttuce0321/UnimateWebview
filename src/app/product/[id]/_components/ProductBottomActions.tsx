'use client';

import React from 'react';

type Props = {
  isSeller: boolean;
  onOpenChat?: () => void; // 구매자: "채팅하기"
  onOpenChatList?: () => void; // 판매자: "채팅 목록"
  onOpenStatus?: () => void; // 판매자: "상태 변경"
};

export default function ProductBottomActions({
  isSeller,
  onOpenChat,
  onOpenChatList,
  onOpenStatus,
}: Props) {
  return (
    <div className="z-5 fixed inset-x-0 bottom-0 mx-auto flex h-[70px] w-full max-w-screen-sm items-center justify-center bg-white p-4">
      {isSeller ? (
        <div className="flex h-full w-full items-center gap-2">
          <button
            type="button"
            onClick={onOpenStatus}
            className="h-[50px] flex-1 rounded-[10px] bg-[#e6f1ff] text-[18px] font-bold leading-[50px] text-[#3c8dff]"
          >
            상태 변경
          </button>
          <button
            type="button"
            onClick={onOpenChatList}
            className="h-[50px] flex-1 rounded-[10px] bg-[#3c8dff] text-[18px] font-bold leading-[50px] text-[#ffffff]"
          >
            채팅 목록
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onOpenChat}
          className="h-[50px] w-full rounded-[10px] bg-[#3c8dff] text-[18px] font-bold leading-[50px] text-white"
        >
          채팅하기
        </button>
      )}
    </div>
  );
}
