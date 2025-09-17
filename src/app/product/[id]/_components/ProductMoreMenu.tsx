'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  isSeller: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onHide?: () => void; // (비활성 메뉴용)
};

export default function ProductMoreMenu({
  isSeller,
  onEdit,
  onDelete,
  onHide,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // iOS 웹뷰: 바깥 탭으로 닫기 + 스크롤 락
  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);

    // 바깥 탭 감지 (iOS는 touchstart 우선)
    const onTouchStart = (e: TouchEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) close();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) close();
    };

    // 앱 백그라운드/다른 화면 전환 시 닫기
    const onHidden = () => {
      if (document.hidden) close();
    };

    // 바디 스크롤 잠금
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('visibilitychange', onHidden);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onHidden);
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onContextMenu={(e) => e.preventDefault()} // iOS 롱프레스 방지
        className="flex h-6 w-6 items-center justify-center [-webkit-tap-highlight-color:transparent]"
      >
        <img
          src="/images/svg/product/icon-system-more-vertical.svg"
          alt="더보기"
        />
      </button>

      {/* 팝오버 */}
      {open && (
        <>
          {/* 오버레이: 바깥 탭 감지용 (div 사용) */}
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onTouchStart={() => setOpen(false)}
          />

          <div
            ref={menuRef}
            role="menu"
            className="absolute right-0 top-7 z-50 flex h-auto w-auto flex-col overflow-hidden rounded-[10px] border bg-white px-4 py-2 text-[14px] font-normal leading-[14px] text-[#7a8086] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* 비활성 항목 */}
            <button
              type="button"
              onClick={() => {
                onHide;
                setOpen(false);
              }}
              className="block h-[30px] w-24 cursor-not-allowed text-left"
              role="menuitem"
            >
              글 숨기기
            </button>

            <button
              type="button"
              onClick={() => {
                onEdit;
                setOpen(false);
              }}
              className="block h-[30px] w-24 text-left"
              role="menuitem"
            >
              수정하기
            </button>

            <button
              type="button"
              onClick={() => {
                onDelete;
                setOpen(false);
              }}
              className="block h-[30px] w-24 text-left"
              role="menuitem"
            >
              삭제하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
