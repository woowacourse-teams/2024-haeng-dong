/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {fixedButtonContainerStyle, fixedButtonStyle} from '@components/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@components/FixedButton/FixedButton.type';

import {useTheme} from '@theme/HDesignProvider';

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
