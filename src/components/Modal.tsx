import { ReactNode, useState } from 'react';
import ModalWrapper from './ModalWrapper';

interface ModalProps {
  children: ReactNode;
  label: string;
}

const Modal = ({ children, label }: ModalProps) => {
  console.log('Modal');
  const [open, setOpen] = useState(false);

  const changeOpen = () => {
    console.log(open);
    setOpen((prev) => !prev);
  };
  return (
    <>
      <button
        className="btn create_collection_btn"
        onClick={(e) => {
          e.stopPropagation();
          changeOpen();
        }}
      >
        {label}
      </button>
      <ModalWrapper isOpen={open} changeOpen={changeOpen}>
        {children}
      </ModalWrapper>
    </>
  );
};

export default Modal;
