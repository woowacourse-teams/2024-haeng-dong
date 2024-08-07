import {css, keyframes} from '@emotion/react';

import {ToastPosition} from './Toast.type';

type ToastMarginStyle = {
  position?: ToastPosition;
  bottom?: string;
  top?: string;
};

// 애니메이션 키프레임 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

export const toastMarginStyle = ({position, bottom, top}: ToastMarginStyle) =>
  css({
    position: 'absolute',
    bottom: position === 'bottom' ? `${bottom}` : 'auto',
    top: position === 'top' ? `${top}` : 'auto',
    left: '50%',
    transform: 'translate(-50%)',

    width: '100%',
    maxWidth: '48rem',
    paddingInline: '1rem',
  });

export const toastStyle = (isVisible: boolean) =>
  css({
    width: '100%',
    padding: '0.625rem 1rem',

    backgroundColor: 'gray',
    boxShadow: '0 0.5rem 0.75rem rgba(0, 0, 0, 0.16);',

    borderRadius: '1.25rem',

    // 애니메이션 추가
    animation: `${isVisible ? fadeIn : fadeOut} 0.5s forwards`,
  });

export const textStyle = css({
  width: '100%',
  color: 'white',
  whiteSpace: 'pre-line',
});
