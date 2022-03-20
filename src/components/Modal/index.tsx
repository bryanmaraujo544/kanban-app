import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, useAnimation } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

import { Container, ModalContainer } from './styles';
import { overlayVariants } from '../../variants/Modal/overlayVariants';
import { modalVariants } from '../../variants/Modal/modalVariants';

interface Props {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: any;
  modalTitle: string;
}

export const Modal = ({ children, isOpen, setIsOpen, modalTitle }: Props) => {
  const overlayControls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      overlayControls.start('show');
    } else {
      overlayControls.start('hidden');
    }
  }, [isOpen]);

  return ReactDOM.createPortal(
    <Container
      as={motion.div}
      animate={overlayControls}
      variants={overlayVariants}
    >
      <ModalContainer
        as={motion.div}
        variants={modalVariants}
        isLarge={modalTitle.length > 18}
      >
        <div className="header">
          <p className="title">{modalTitle}</p>
          <button
            type="button"
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <IoClose className="icon" />
          </button>
        </div>
        {children}
      </ModalContainer>
    </Container>,
    document?.getElementById('modal-root') as any
  );
};
