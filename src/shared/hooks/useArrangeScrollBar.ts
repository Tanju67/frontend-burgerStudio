import { useEffect } from "react";

export const useArrangeScrollBar = (isModalOpen: boolean) => {
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
    };
  }, [isModalOpen]);
};
