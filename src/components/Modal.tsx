import { ReactNode, useState } from 'react';
import ModalWrapper from './ModalWrapper';

interface ModalProps {
  children: ReactNode;
  label: string;
  disabled?: boolean;
}

const Modal = ({ children, label, disabled }: ModalProps) => {
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <button
        disabled={disabled}
        className="btn create_collection_btn"
        onClick={(e) => {
          e.stopPropagation();
          changeOpen();
        }}
        data-testid="modal_button"
      >
        {label}
      </button>
      <ModalWrapper isOpen={open} setOpen={setOpen}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
