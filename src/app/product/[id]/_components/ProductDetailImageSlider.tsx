'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  images: string[];
}

const ProductDetailImageSlider = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // MEMO : 일단 이미지 없는 경우에도 대응은 해놨는지 실제로 퍼블리싱 해야하는지는 확인 필요(기획서,디자인 둘다 없음)
  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center bg-gray-200">
        <span className="text-gray-500">이미지 없음</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-square">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full">
              <img
                src={image}
                alt={`상품 이미지 ${index + 1}`}
                className="h-full w-full select-none object-cover"
                draggable={false}
              />
            </div>
          </SwiperSlide>
        ))}

        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10 w-[46px] rounded-[4px] bg-[#000000]/40 px-2 py-[6px] text-[14px] font-semibold text-white">
            <span>{activeIndex + 1} </span>
            <span>/</span>
            <span className="font-medium text-[#c1c7cf]"> {images.length}</span>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ProductDetailImageSlider;
