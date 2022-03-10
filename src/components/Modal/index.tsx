import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, useAnimation } from 'framer-motion';

import { Container, ModalContainer } from './styles';
import { overlayVariants } from '../../variants/Modal/overlayVariants';
import { modalVariants } from '../../variants/Modal/modalVariants';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: any;
}

export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  console.log({ setIsOpen });
  const overlayControls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      overlayControls.start('show');
    }
  }, [isOpen]);

  return ReactDOM.createPortal(
    <Container
      as={motion.div}
      animate={overlayControls}
      variants={overlayVariants}
    >
      <ModalContainer as={motion.div} variants={modalVariants}>
        <h1>Modal</h1>
        {children}
      </ModalContainer>
    </Container>,
    document?.getElementById('modal-root') as any
  );
};
