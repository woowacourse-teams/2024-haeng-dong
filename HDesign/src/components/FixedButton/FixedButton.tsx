/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {
  fixedButtonContainerStyle,
  fixedButtonStyle,
  deleteButtonStyle,
  buttonContainerStyle,
} from '@components/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@components/FixedButton/FixedButton.type';

import {useTheme} from '@theme/HDesignProvider';

import Trash from '@assets/trash.svg';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', onDeleteClick, ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <div css={fixedButtonContainerStyle(theme)}>
      <div css={buttonContainerStyle}>
        {onDeleteClick && (
          <button css={deleteButtonStyle(theme)} onClick={onDeleteClick}>
            <Trash />
          </button>
        )}
        <button css={fixedButtonStyle({variants, theme})} ref={ref} {...htmlProps} />
      </div>
    </div>
  );
});

export default FixedButton;
