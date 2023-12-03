import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import ReactDom from 'react-dom';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

interface ModalWrapperProps {
  children: ReactNode;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWrapper = ({ children, isOpen, setOpen }: ModalWrapperProps) => {
  return ReactDom.createPortal(
    <>
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            className="modal-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropIn}
              className="modal_window"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn_close"
                onClick={() => {
                  setOpen(false);
                }}
              >
                &#xD7;
              </button>
              {children}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>,
    document.getElementById('portal')!
  );
};

export default ModalWrapper;
