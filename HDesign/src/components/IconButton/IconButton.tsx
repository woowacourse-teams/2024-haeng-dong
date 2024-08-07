/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {IconButtonProps} from '@components/IconButton/IconButton.type';

import {useTheme} from '@theme/HDesignProvider';

import {iconButtonStyle} from './IconButton.style';

export const IconButton: React.FC<IconButtonProps> = forwardRef<HTMLButtonElement, IconButtonProps>(function Button(
  {size = 'large', variants, children, ...htmlProps}: IconButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <button ref={ref} css={iconButtonStyle({theme, size, variants})} {...htmlProps}>
      {children}
    </button>
  );
});

export default IconButton;
