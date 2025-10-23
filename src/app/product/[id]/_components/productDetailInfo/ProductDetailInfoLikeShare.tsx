import React from 'react';

interface Props {
  isLiked: boolean;
  onLikeToggle: () => void;
  onShare: () => void;
}

const ProductDetailInfoLikeShare = ({
  isLiked,
  onLikeToggle,
  onShare,
}: Props) => {
  return (
    <div className="flex justify-center rounded-[10px] border border-[#e3e9f1]">
      {/* 찜하기 버튼 */}
      <button
        className="flex flex-1 items-center justify-center gap-[6px] py-3"
        onClick={onLikeToggle}
      >
        <img
          src={
            isLiked
              ? '/images/favorite_icon _ favorite_on.png'
              : '/images/svg/product/icon-toggle-favorite.svg'
          }
          alt="찜하기"
          className="w-6 h-6"
        />
        <span className="text-[14px] font-normal leading-[14px] text-[#464b52]">
          찜하기
        </span>
      </button>

      {/* 구분선 */}
      <div className="w-px bg-[#e3e9f1]" />

      {/* 공유하기 버튼 */}
      <button
        className="flex items-center justify-center flex-1 gap-2 py-3 hover:bg-gray-50"
        onClick={onShare}
      >
        <img
          src="/images/svg/product/shareIcon.svg"
          alt="공유하기"
          className="w-6 h-6"
        />
        <span className="text-[14px] font-normal leading-[14px] text-[#464b52]">
          공유하기
        </span>
      </button>
    </div>
  );
};

export default ProductDetailInfoLikeShare;
