import React, { useState, useCallback } from 'react';
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
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id, disabled: !isDragEnabled });

  const style = {
    transform: transform ? `translateX(${transform.x}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const timer = setTimeout(() => {
      setIsDragEnabled(true);
    }, 500);

    const handleTouchEnd = () => {
      clearTimeout(timer);
      setIsDragEnabled(false);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };

    const handleTouchMove = () => {
      clearTimeout(timer);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };

    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isDragEnabled ? listeners : {})}
      onTouchStart={handleTouchStart}
      onContextMenu={handleContextMenu}
      className="touch-none select-none"
    >
      <ImagesItem images={image} index={index} onRemoveImage={onRemoveImage} />
    </div>
  );
}
