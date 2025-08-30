import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImagesItem from 'app/register/_components/registerForm/ImagesItem';

type Props = {
  id: string;
  image: string;
  index: number;
  onRemoveImage: (index: number) => void;
};

export default function SortableImageItem({
  id,
  image,
  index,
  onRemoveImage,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    // 필요 시 드래그 중에만 스크롤 막고 싶다면:
    // touchAction: isDragging ? 'none' : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="select-none"
      onContextMenu={(e) => e.preventDefault()} // iOS/Safari 길게누르기 메뉴 방지
    >
      <ImagesItem images={image} index={index} onRemoveImage={onRemoveImage} />
    </div>
  );
}
