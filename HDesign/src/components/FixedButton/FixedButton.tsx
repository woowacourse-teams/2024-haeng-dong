/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {
  fixedButtonContainerStyle,
  fixedButtonStyle,
  deleteButtonStyle,
  buttonContainerStyle,
} from '@components/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@components/FixedButton/FixedButton.type';
import IconButton from '@components/IconButton/IconButton';
import Icon from '@components/Icon/Icon';

import Trash from '@assets/trash.svg';

import {useTheme} from '@theme/HDesignProvider';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', onDeleteClick, ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <div css={fixedButtonContainerStyle(theme)}>
      <div css={buttonContainerStyle}>
        {onDeleteClick && (
          <IconButton size="large" variants="destructive" onClick={onDeleteClick}>
            <Icon iconType="trash" />
          </IconButton>
        )}
        <button css={fixedButtonStyle({variants, theme})} ref={ref} {...htmlProps} />
      </div>
    </div>
  );
});

export default FixedButton;
