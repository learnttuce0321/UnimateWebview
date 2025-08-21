'use client';

type Props = {
  images: string;
  index: number;
  onRemoveImage: (index: number) => void;
};

export default function ImagesItem({ images, index, onRemoveImage }: Props) {
  const isMainImage = index === 0;

  return (
    <div className="relative h-[65px] w-[65px]">
      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={() => onRemoveImage(index)}
        className="absolute right-[-5px] top-[-5px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-blue_gray-600 text-xs text-white"
      >
        <img
          src="/images/svg/register/icon-system-close-image.svg"
          alt="닫기"
        />
      </button>
      {/* 이미지 */}
      <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-[5px] border border-solid outline-outline-black-light">
        <img
          src={images}
          alt={`상품 이미지 ${index + 1}`}
          className="h-full w-full rounded-[5px] object-cover"
        />
      </div>

      {isMainImage && (
        <div className="absolute bottom-0 flex h-[18px] w-full items-center justify-center rounded-b-[5px] bg-blue-600_P text-[10px] text-white">
          대표 사진
        </div>
      )}
    </div>
  );
}
