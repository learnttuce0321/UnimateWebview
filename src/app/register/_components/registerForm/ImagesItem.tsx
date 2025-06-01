'use client';

type Props = {
  images: string;
  index: number;
  onRemoveImage: (index: number) => void;
};

export default function ImagesItem({ images, index, onRemoveImage }: Props) {
  const isMainImage = index === 0;

  return (
    <div className="relative w-[65px] h-[65px]">
      {/* 삭제 버튼 */}
      <button
        type="button"
        onClick={() => onRemoveImage(index)}
        className="absolute top-[-5px] right-[-5px] bg-blue_gray-600 text-white w-[20px] h-[20px] text-xs rounded-full flex items-center justify-center"
      >
        <img
          src="/images/svg/register/icon-system-close-image.svg"
          alt="닫기"
        />
      </button>
      {/* 이미지 */}
      <div className="w-full h-full rounded-[5px] border border-solid outline-outline-black-light box-border flex flex-col justify-center items-center">
        <img
          src={images}
          alt={`상품 이미지 ${index + 1}`}
          className="w-full h-full rounded-[5px]"
        />
      </div>

      {isMainImage && (
        <div className="absolute bottom-0 w-full h-[18px] bg-blue-600_P flex items-center justify-center text-[10px] text-white rounded-b-[5px]">
          대표 사진
        </div>
      )}
    </div>
  );
}
