/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {useTheme} from '@theme/HDesignProvider';

import Text from '../Text/Text';

import {TextButtonProps} from './TextButton.type';

export const TextButton: React.FC<TextButtonProps> = forwardRef<HTMLButtonElement, TextButtonProps>(function Button(
  {textColor, textSize, children, ...htmlProps}: TextButtonProps,
  ref,
) {
  const {theme} = useTheme();

  return (
    <button ref={ref} {...htmlProps}>
      <Text size={textSize} textColor={textColor}>
        {children}
      </Text>
    </button>
  );
});

export default TextButton;
