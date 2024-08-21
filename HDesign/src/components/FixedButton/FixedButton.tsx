/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';
import Lottie from 'lottie-react';

import {
  fixedButtonContainerStyle,
  fixedButtonStyle,
  buttonContainerStyle,
} from '@components/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@components/FixedButton/FixedButton.type';
import IconButton from '@components/IconButton/IconButton';
import Icon from '@components/Icon/Icon';

import loadingAnimation from '@assets/loadingAnimation.json';

import {useTheme} from '@theme/HDesignProvider';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', onDeleteClick, disabled, children, ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <div css={fixedButtonContainerStyle(theme)}>
      <div css={buttonContainerStyle}>
        {onDeleteClick && (
          <IconButton type="button" size="large" variants="destructive" onClick={onDeleteClick}>
            <Icon iconType="trash" />
          </IconButton>
        )}
        <button
          css={fixedButtonStyle({variants, theme})}
          ref={ref}
          disabled={variants === 'loading' ? true : disabled}
          {...htmlProps}
        >
          {variants === 'loading' ? (
            <Lottie animationData={loadingAnimation} loop={true} style={{width: 240, height: 20}} />
          ) : (
            children
          )}
        </button>
      </div>
    </div>
  );
});

export default FixedButton;
