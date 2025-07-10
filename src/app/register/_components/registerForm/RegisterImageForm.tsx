'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import SortableImageItem from 'app/register/_components/registerForm/SortableImageItem';

const MAX_IMAGES_COUNT = 10;

export default function RegisterImageForm() {
  const [images, setImages] = useState<string[]>([
    '/images/test_images/product_example.png',
    '/images/test_images/product_example_2.png',
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 드래그 인식 최소 거리
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = images.findIndex((_, i) => i.toString() === active.id);
      const newIndex = images.findIndex((_, i) => i.toString() === over?.id);

      setImages((images) => arrayMove(images, oldIndex, newIndex));
    }
  };

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

  return (
    <div className="no-scrollbar flex h-[73px] items-end overflow-x-auto overflow-y-hidden">
      {/* 상품 등록 버튼 */}
      <div className="mr-[16px] flex-shrink-0">
        <button
          type="button"
          onClick={handleClickUploadButton}
          className="box-border flex h-[65px] w-[65px] flex-col items-center justify-center rounded-[5px] border border-solid bg-gray-100 outline-gray-200"
        >
          <img
            src="/images/svg/register/icon-system-camera.svg"
            alt="사진 등록"
          />
          <div className="flex items-center text-[14px]">
            <p className="text-center font-medium text-blue-600">
              {images.length}
            </p>
            <p className="text-center font-normal">/{MAX_IMAGES_COUNT}</p>
          </div>
        </button>
      </div>

      {/* 드래그 가능한 이미지 리스트 */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((_, i) => i.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-[16px]">
            {images.map((image, index) => (
              <SortableImageItem
                key={index}
                id={index.toString()}
                image={image}
                index={index}
                onRemoveImage={handleRemoveImage}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
