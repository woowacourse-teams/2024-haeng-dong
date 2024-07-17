/** @jsxImportSource @emotion/react */

import React, {forwardRef} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {buttonStyle} from '@components/Button/Button.style';
import {ButtonProps} from '@components/Button/Button.type';

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {variants = 'primary', size = 'medium', ...htmlProps}: ButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return <button css={buttonStyle({variants, size, theme})} ref={ref} {...htmlProps} />;
});

export default Button;
