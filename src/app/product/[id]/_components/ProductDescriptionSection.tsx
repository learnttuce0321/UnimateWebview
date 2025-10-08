'use client';

import React from 'react';

type Props = {
  description: string;
  onReportClick: () => void;
};

export default function ProductDescriptionSection({
  description,
  onReportClick,
}: Props) {
  return (
    <section className="flex flex-col justify-center gap-4 p-4">
      <h3 className="text-[14px] font-semibold leading-[14px] text-blue_gray-700">
        상품 정보
      </h3>

      {/* 싱품 설명 영역 */}
      <p
        style={{ whiteSpace: 'pre-wrap' }}
        className="text-[유저가 게시글 등록 시 작성한 내용 유저가 게시글 등록 시 작성한 내용 유저가 게시글 등록 시 작성한 내용 유저가 게시글 등록 시 작성한 내용 유저가 게시글 등록 시 작성한 내용 유저가 게시글 등록 시 작성한 내용] text-[16px] font-medium leading-[22.4px]"
      >
        {description}
      </p>

      {/* 게시글 신고하기 버튼 */}
      <button
        type="button"
        onClick={onReportClick}
        className="self-start text-[12px] font-medium leading-[16.8px] text-[#7a8086] underline underline-offset-2 hover:text-[#4b5563]"
      >
        게시글 신고하기
      </button>
    </section>
  );
}
