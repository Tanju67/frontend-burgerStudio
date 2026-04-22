import { createPortal } from "react-dom"; // Portal için import
import { AnimatePresence, motion } from "framer-motion";
import { useArrangeScrollBar } from "../../hooks/useArrangeScrollBar";
import { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
  open: boolean;
};

function Modal({ children, onClose, className = "", open }: ModalProps) {
  useArrangeScrollBar(open);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.1, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.1, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={`relative z-110 rounded-lg p-4 pt-8 shadow-2xl md:p-8 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-main-btn hover:text-main-btn-hover absolute top-1 right-1 z-120 transition-all duration-300 hover:rotate-90 active:scale-90"
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoCloseCircleOutline size={40} />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;
