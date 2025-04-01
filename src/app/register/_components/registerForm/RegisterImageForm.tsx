'use client';

import React, { useState } from 'react';
import ImagesItem from './ImagesItem';

const MAX_IMAGES_COUNT = 10;

export default function RegisterImageForm() {
  // TODO : 임시로 확인을 위한 상태 선언
  const [images, setImages] = useState<string[]>([
    '/images/test_images/product_example.png',
    '/images/test_images/product_example_2.png',
  ]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // TODO : 네이티브 통신을 사용한 디바이스 사진첩에 접근해야함
  const handleClickUploadButton = () => {
    if (images.length < MAX_IMAGES_COUNT) {
      setImages([...images, '/images/test_images/product_example.png']);
    } else {
      alert('최대 이미지 개수를 초과했습니다.');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updatedImages = [...images];
    const draggedItem = updatedImages.splice(draggedIndex, 1)[0];
    updatedImages.splice(dropIndex, 0, draggedItem);
    setImages(updatedImages);
    setDraggedIndex(null);
  };

  return (
    <div className="h-[73px] flex items-end overflow-x-auto no-scrollbar">
      {/* 상품 등록 버튼 */}
      <div className="flex-shrink-0 mr-[16px]">
        <button
          type="button"
          onClick={handleClickUploadButton}
          className="w-[65px] h-[65px] bg-gray-100 rounded-[5px] border border-solid box-border outline-gray-200 flex flex-col justify-center items-center"
        >
          <img src="/images/svg/icon-system-camera.svg" alt="사진 등록" />
          <div className="flex items-center text-[14px]">
            <p className="font-medium text-center text-blue-600">
              {images.length}
            </p>
            <p className="font-normal text-center">/{MAX_IMAGES_COUNT}</p>
          </div>
        </button>
      </div>

      {/* 상품 이미지 리스트 */}
      <div className="flex gap-[16px]">
        {images.map((image, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <ImagesItem
              images={image}
              index={index}
              onRemoveImage={handleRemoveImage}
              onDragStart={handleDragStart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
