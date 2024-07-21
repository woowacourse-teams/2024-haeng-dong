/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';
import {TextButtonProps} from './TextButton.type';
import Text from '../Text/Text';
import {useTheme} from '@/theme/HDesignProvider';
import {textButtonStyle} from './TextButton.style';

export const TextButton: React.FC<TextButtonProps> = forwardRef<HTMLButtonElement, TextButtonProps>(function Button(
  {textColor, textSize, children, ...htmlProps}: TextButtonProps,
  ref,
) {
  const {theme} = useTheme();

  return (
    <button ref={ref} {...htmlProps}>
      <Text size={textSize} css={textButtonStyle({textColor, theme})}>
        {children}
      </Text>
    </button>
  );
});

export default TextButton;
