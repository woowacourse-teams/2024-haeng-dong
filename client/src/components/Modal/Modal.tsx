import React from 'react';
import {css} from '@emotion/react';
import {modalBodyStyle, modalBackdropStyle} from './Modal.style';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({children, onClose}: ModalProps) => {
  return (
    <>
      <div css={modalBackdropStyle} onClick={onClose} />
      <div css={modalBodyStyle}>{children}</div>
    </>
  );
};

export default Modal;
