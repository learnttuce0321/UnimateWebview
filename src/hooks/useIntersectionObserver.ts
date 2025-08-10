import { MutableRefObject, useEffect } from 'react';

interface UseIntersectionObserver extends IntersectionObserverInit {
  target: MutableRefObject<HTMLElement | null>;
  onIntersect: () => void;
  enabled?: boolean;
}

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 0.5,
  rootMargin = '0px',
  enabled = false,
}: UseIntersectionObserver) {
  const entriesFn: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      entry.isIntersecting && onIntersect();
    });
  };

  useEffect(() => {
    try {
      if (!enabled) return;
      const observer = new IntersectionObserver(entriesFn, {
        root: root && root,
        rootMargin,
        threshold,
      });

      const el = target && target.current;
      if (!el) return;

      observer.observe(el);
      return () => observer.unobserve(el);
    } catch (err) {
      console.log(err);
    }
  }, [target.current, enabled, onIntersect, threshold]);
}
