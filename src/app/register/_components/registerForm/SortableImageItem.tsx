import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
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

  const style = {
    transform: transform ? `translateX(${transform.x}px)` : undefined, // Y축 제거
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <ImagesItem images={image} index={index} onRemoveImage={onRemoveImage} />
    </div>
  );
}
