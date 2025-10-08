'use client';

import React from 'react';

type Seller = {
  name: string;
  profileImage?: string | null;
};

type Props = {
  seller: Seller;
  universityName?: string;
};

export default function ProductSellerSection({
  seller,
  universityName,
}: Props) {
  return (
    <section className="px-4 pt-4">
      <div className="flex flex-col justify-center gap-4 border-b border-[#e3e9f1] pb-4">
        <h3 className="text-[14px] font-semibold leading-[14px] text-blue_gray-700">
          판매자 정보
        </h3>

        {/* 유저 프로필 및 대학 정보 영역 */}
        <div className="flex items-center gap-4">
          {/* 유저 프로필 이미지 */}
          <img
            src={
              seller.profileImage ?? '/images/svg/default/default_profile.svg'
            }
            alt={`${seller.name} 프로필 이미지`}
            className="h-12 w-12"
          />

          {/* 유저 이름 & 대학 정보 */}
          <div className="flex flex-col justify-center gap-2">
            <p className="text-[16px] font-bold leading-4 text-[#25292f]">
              {seller.name}
            </p>

            {/* 대학 영역 */}
            {universityName && (
              <div className="flex items-center gap-2">
                <img
                  src="/images/svg/product/badgeIcon.svg"
                  alt="대학인증"
                  className="h-[14px] w-[14px]"
                />
                <p className="text-[14px] font-medium leading-[14px] text-[#7a8086]">
                  {universityName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
