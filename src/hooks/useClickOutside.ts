import { useEffect, useRef } from 'react';

export const useClickOutside = (onClick: () => any) => {
  const areaRef = useRef<any>();

  useEffect(() => {
    const handler = (event: any) => {
      if (!areaRef?.current?.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClick]);

  return areaRef;
};
