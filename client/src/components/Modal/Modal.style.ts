import {css} from '@emotion/react';

export const modalBodyStyle = css`
  z-index: 100;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

export const modalBackdropStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
