/** @jsxImportSource @emotion/react */

import React, {forwardRef} from 'react';

import {buttonStyle} from '@components/Button/Button.style';
import {ButtonProps, ButtonSize} from '@components/Button/Button.type';

import {useTheme} from '@theme/HDesignProvider';
import Lottie from 'lottie-react';

import loadingAnimation from '@assets/loadingAnimation.json';

const animationSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return {width: 30, height: 12};

    case 'large':
      return {width: 50, height: 20};

    default:
      return {width: 40, height: 16};
  }
};

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {variants = 'primary', size = 'medium', disabled, children, ...htmlProps}: ButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <button
      css={buttonStyle({variants, size, theme})}
      ref={ref}
      disabled={variants === 'loading' ? true : disabled}
      {...htmlProps}
    >
      {variants === 'loading' ? (
        <Lottie animationData={loadingAnimation} loop={true} style={animationSize(size)} />
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
