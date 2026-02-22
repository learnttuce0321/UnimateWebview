import { useState, useCallback, ReactNode } from 'react';

export interface PopupPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface PopupData {
  children: ReactNode;
  position?: PopupPosition;
  onClose?: () => void;
}

export interface PopupState extends PopupData {
  isOpened: boolean;
}

export const usePopup = () => {
  const [popupState, setPopupState] = useState<PopupState>({
    isOpened: false,
    children: null,
  });

  const openPopup = useCallback((data: PopupData) => {
    setPopupState({
      isOpened: true,
      ...data,
    });
  }, []);

  const closePopup = useCallback(() => {
    setPopupState((prev) => {
      prev.onClose?.();
      return {
        ...prev,
        isOpened: false,
      };
    });
  }, []);

  return {
    popupState,
    openPopup,
    closePopup,
  };
};
