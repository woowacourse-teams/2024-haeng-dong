/** @jsxImportSource @emotion/react */
import React, {forwardRef} from 'react';

import {buttonStyle} from './Button.style';

import {ButtonProps} from './Button.type';

import {useTheme} from '../../theme/HDesignProvider';

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {variants = 'primary', size = 'medium', ...htmlProps}: ButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return <button css={buttonStyle({variants, size, theme})} ref={ref} {...htmlProps} />;
});

export default Button;
