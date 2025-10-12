'use client';

import { useEffect, useRef } from 'react';
import { PopupState } from './usePopup';

interface Props {
  popupState: PopupState;
  onClose: () => void;
  className?: string;
}

const Popup = ({ popupState, onClose, className = '' }: Props) => {
  const { isOpened, children, position } = popupState;
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpened) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpened, onClose]);

  if (!isOpened) {
    return null;
  }

  const getPositionStyles = (): React.CSSProperties => {
    if (!position) return {};

    const styles: React.CSSProperties = {};

    if (position.top) styles.top = position.top;
    if (position.bottom) styles.bottom = position.bottom;
    if (position.left) styles.left = position.left;
    if (position.right) styles.right = position.right;

    return styles;
  };

  return (
    <div
      ref={popupRef}
      className={`absolute z-40 ${className}`}
      style={getPositionStyles()}
    >
      {children}
    </div>
  );
};

export default Popup;
