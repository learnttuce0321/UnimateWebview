import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImagesItem from './ImagesItem';

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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
