'use client';

import React, { useState, useEffect } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
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
import { FormDataType } from '../../_type/registerType';
import { registerApi } from '../../_api/registerApi';
import {
  isBridgeAvailable,
  extractFileNameFromUrl,
  selectImagesFromDevice,
} from '../../../../utils/bridge';
import { uploadImageWithPresignedUrl } from '../../../../utils/fileUpload';

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

  const handleClickUploadButton = async () => {
    if (images.length >= MAX_IMAGES_COUNT) {
      alert('최대 이미지 개수를 초과했습니다.');
      return;
    }

    if (isUploading) {
      alert('이미지 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }

    setIsUploading(true);

    try {
      if (isBridgeAvailable()) {
        // iOS 브릿지를 통한 이미지 선택
        console.log('Using iOS bridge to select images');
        const selectedImageUrls = await selectImagesFromDevice();

        if (selectedImageUrls.length === 0) {
          console.log('No images selected');
          return;
        }

        // 선택 가능한 이미지 개수 체크
        const remainingSlots = MAX_IMAGES_COUNT - images.length;
        const imagesToProcess = selectedImageUrls.slice(0, remainingSlots);

        if (selectedImageUrls.length > remainingSlots) {
          alert(
            `최대 ${MAX_IMAGES_COUNT}개까지만 선택할 수 있습니다. ${remainingSlots}개만 추가됩니다.`
          );
        }

        // 각 이미지를 순차적으로 업로드
        for (const fileUrl of imagesToProcess) {
          const fileName = extractFileNameFromUrl(fileUrl);

          const result = await uploadImageWithPresignedUrl(
            fileUrl,
            fileName,
            async (fileName) => {
              const response = await registerApi.getPresignedUrl({
                fileNames: [fileName],
              });
              return {
                presignedUrl: response.urlList[0].presignedUrl,
                key: response.urlList[0].key,
              };
            }
          );

          if (result.success) {
            setImages((prev) => [...prev, result.localUrl]);
            setImageKeys((prev) => [...prev, result.imageKey]);
            console.log('Image uploaded successfully:', result.fileName);
          } else {
            console.error('Image upload failed:', result.error);
            alert(`이미지 업로드 실패: ${result.fileName}`);
          }
        }
      } else {
        // 웹 환경에서는 테스트용 이미지 사용
        console.log('iOS bridge not available, using test image');
        const testFileName = `product_example_${Date.now()}.png`;

        const response = await registerApi.getPresignedUrl({
          fileNames: [testFileName],
        });

        const newImageUrl = '/images/test_images/product_example.png';
        const newImageKey = response.urlList[0].key;

        setImages([...images, newImageUrl]);
        setImageKeys([...imageKeys, newImageKey]);
      }
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageKeys(imageKeys.filter((_, i) => i !== index));
  };

  return (
    <div className="no-scrollbar flex h-[73px] items-end overflow-x-auto overflow-y-hidden">
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
          items={images.map((_, i) => i.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-[16px]">
            {images.map((image, index) => (
              <SortableImageItem
                key={`${image}-${index}`}
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
