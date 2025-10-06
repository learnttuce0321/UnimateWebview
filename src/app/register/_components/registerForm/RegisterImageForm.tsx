'use client';

import React, { useState, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
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
import { FormDataType } from 'types/Product';
import {
  isBridgeAvailable,
  extractFileNameFromUrl,
  selectImagesFromDevice,
} from '../../../../utils/bridge';
import { uploadImageWithPresignedUrl } from '../../../../utils/fileUpload';
import { registerApi } from '../../_api/registerApi';

const MAX_IMAGES_COUNT = 10;

interface RegisterImageFormProps {
  setValue: UseFormSetValue<FormDataType>;
}

export default function RegisterImageForm({
  setValue,
}: RegisterImageFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setValue('images', imageKeys);
  }, [imageKeys, setValue]);

  // ✅ dnd-kit 센서: 롱프레스 + 스크롤 구분 (움직임 있으면 드래그 취소)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 300, tolerance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 300, tolerance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = imageKeys.findIndex((k) => k === active.id);
    const newIndex = imageKeys.findIndex((k) => k === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    setImageKeys((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleClickUploadButton = async () => {
    setIsUploading(true);
    try {
      if (isBridgeAvailable()) {
        const selectedImageUrls = await selectImagesFromDevice(images);
        if (!selectedImageUrls.length) return;

        const remainingSlots = MAX_IMAGES_COUNT - images.length;
        const imagesToProcess = selectedImageUrls.slice(0, remainingSlots);

        for (const fileUrl of imagesToProcess) {
          const fileName = extractFileNameFromUrl(fileUrl);
          try {
            const result = await uploadImageWithPresignedUrl(
              fileUrl,
              fileName,
              async (fn) => {
                const response = await registerApi.getPresignedUrl({
                  fileNames: [fn],
                });
                return {
                  presignedUrl: response.urlList[0].presignedUrl,
                  key: response.urlList[0].key,
                };
              }
            );

            if (result.success) {
              setImages((prev) => [...prev, result.localUrl]);
              setImageKeys((prev) => [...prev, result.imageKey]); // ✅ 안정적 id
            } else {
              console.error('❌ [UPLOAD FAILED]', result);
            }
          } catch (e) {
            console.error('💥 [UPLOAD ERROR]', e);
          }
        }
      } else {
        // 웹 테스트
        const testFileName = `product_example_${Date.now()}.png`;
        const response = await registerApi.getPresignedUrl({
          fileNames: [testFileName],
        });

        if (response?.urlList?.[0]?.key) {
          setImages((prev) => [
            ...prev,
            '/images/test_images/product_example.png',
          ]);
          setImageKeys((prev) => [...prev, response.urlList[0].key]); // ✅ 안정적 id
        } else {
          console.error('Invalid response structure:', response);
        }
      }
    } catch (e) {
      console.error('Failed to upload images:', e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageKeys((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="no-scrollbar flex h-[73px] items-end overflow-x-auto overflow-y-hidden"
      // 팁) 필요하면 여기에 style={{ touchAction: 'pan-x' }}를 주면
      // 수평 스크롤 의도를 브라우저에 알려줄 수 있습니다.
    >
      {/* 상품 등록 버튼 */}
      <div className="mr-[16px] flex-shrink-0">
        <button
          type="button"
          onClick={handleClickUploadButton}
          disabled={isUploading}
          className="box-border flex h-[65px] w-[65px] flex-col items-center justify-center rounded-[5px] border border-solid bg-gray-100 outline-gray-200 disabled:opacity-50"
        >
          {isUploading ? (
            <div className="text-[12px] font-medium text-blue-600">
              업로드중...
            </div>
          ) : (
            <>
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
            </>
          )}
        </button>
      </div>

      {/* 드래그 가능한 이미지 리스트 */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={imageKeys}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-[16px]">
            {images.map((image, index) => (
              <SortableImageItem
                key={imageKeys[index] ?? `${image}-${index}`}
                id={imageKeys[index] ?? String(index)}
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
