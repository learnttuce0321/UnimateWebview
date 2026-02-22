'use client';

import React from 'react';
import { useQueryProductTradeProgress } from 'hooks/products/useQueryProductTradeProgress';
import productScheme, { TradeStatus } from 'utils/productScheme';

type Props = {
  isSeller: boolean;
  productId?: number; // 판매자일 때 필요
  currentStatus?: TradeStatus; // 판매자일 때 필요
  onConnectChatRoom: () => void; // 구매자: "채팅하기"
  onOpenChatList: () => void; // 판매자: "채팅 목록"
};

export default function ProductBottomActions({
  isSeller,
  productId,
  currentStatus,
  onConnectChatRoom,
  onOpenChatList,
}: Props) {
  const { refetch: fetchTradeProgress } = useQueryProductTradeProgress(
    productId || 0
  );

  const handleStatusChange = async () => {
    if (!productId || !currentStatus) return;

    const { changeTradeStatus } = productScheme();

    // 예약중 상태일 때 거래 진행 정보 조회
    if (currentStatus === 'RESERVED') {
      try {
        const { data } = await fetchTradeProgress();
        if (data) {
          changeTradeStatus({
            productId,
            currentStatus,
            buyerId: data.buyerId,
            conversationId: data.conversationId,
          });
        }
      } catch (error) {
        console.error('Failed to fetch trade progress:', error);
        changeTradeStatus({
          productId,
          currentStatus,
        });
      }
    } else {
      changeTradeStatus({
        productId,
        currentStatus,
      });
    }
  };
  return (
    <div className="z-5 fixed inset-x-0 bottom-0 mx-auto flex h-[70px] w-full max-w-screen-sm items-center justify-center bg-white p-4">
      {isSeller ? (
        <div className="flex h-full w-full items-center gap-2">
          <button
            type="button"
            onClick={handleStatusChange}
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
          onClick={onConnectChatRoom}
          className="h-[50px] w-full rounded-[10px] bg-[#3c8dff] text-[18px] font-bold leading-[50px] text-white"
        >
          채팅하기
        </button>
      )}
    </div>
  );
}
