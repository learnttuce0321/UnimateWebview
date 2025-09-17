'use client';

import React from 'react';
import { formatNumber } from 'utils/formatNumber';
import { formatTimeAgo } from 'utils/formatTime';

interface Props {
  title: string;
  price: number;
  currencyType: string;
  createdAt: string;
  likeCount: number;
  chatRoomCount: number;
}

const ProductDetailInfoHeader = ({
  title,
  price,
  currencyType,
  createdAt,
  likeCount,
  chatRoomCount,
}: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      {/* 카테고리 영역 */}
      <span className="text-[14px] font-semibold leading-[14px] text-[#666b72]">
        카테고리 명
      </span>

      {/* 제목 및 가격 영역 */}
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-[18px] font-medium text-[#25292f]">{title}</h2>
        {/* 가격 & 예약중 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-[#fa8646] px-[6px] py-1 text-[12px] font-semibold leading-3 text-white">
            예약중
          </div>
          <span className="text-[20px] font-bold text-[#25292f]">
            {formatNumber(price)}
            {currencyType === 'KRW' ? '원' : ' USD'}
          </span>
        </div>
      </div>

      {/* 시간 및 찜 & 채팅수 영역 */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-[12px] font-normal leading-3 text-[#666b72]">
          {formatTimeAgo(createdAt)}
        </span>

        {/* 찜 & 채팅수 영역 */}
        <div className="flex justify-center gap-2">
          <div className="flex items-center justify-center gap-[2px]">
            <img
              src="/images/svg/product/icon-system-favorite-small.svg"
              alt="찜수"
              className="w-3 h-3"
            />
            <span className="text-[12px] font-normal leading-3 text-[#7a8086]">
              {likeCount}
            </span>
          </div>

          <div className="flex items-center justify-center gap-[2px]">
            <img
              src="/images/svg/product/icon-system-chat.svg"
              alt="채팅수"
              className="w-3 h-3"
            />
            <span className="text-[12px] font-normal leading-3 text-[#7a8086]">
              {chatRoomCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfoHeader;
