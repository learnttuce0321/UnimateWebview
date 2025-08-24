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

  const handleMouseDown = useCallback(() => {
    const timer = setTimeout(() => {
      setIsDragEnabled(true);
    }, 500);

    const handleMouseUp = () => {
      clearTimeout(timer);
      setIsDragEnabled(false);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseMove = () => {
      clearTimeout(timer);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
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
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      className="select-none"
    >
      <ImagesItem images={image} index={index} onRemoveImage={onRemoveImage} />
    </div>
  );
}
