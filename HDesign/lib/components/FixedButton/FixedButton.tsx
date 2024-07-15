/** @jsxImportSource @emotion/react */
import {useTheme} from '../../theme/HDesignProvider';
import {fixedButtonContainerStyle, fixedButtonStyle} from './FixedButton.style';
import {forwardRef} from 'react';
import {FixedButtonProps} from './FixedButton.type';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <div css={fixedButtonContainerStyle(theme)}>
      <button css={fixedButtonStyle({variants, theme})} ref={ref} {...htmlProps} />
    </div>
  );
});

export default FixedButton;
