/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';
import Lottie from 'lottie-react';

import loadingAnimation from '@assets/image/loadingAnimation.json';
import {
  fixedButtonContainerStyle,
  fixedButtonStyle,
  buttonContainerStyle,
  cancleButtonStyle,
  deleteButtonStyle,
} from '@HDcomponents/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@HDcomponents/FixedButton/FixedButton.type';
import IconButton from '@HDcomponents/IconButton/IconButton';
import Icon from '@HDcomponents/Icon/Icon';
import {useTheme} from '@theme/HDesignProvider';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', onDeleteClick, onBackClick, disabled, children, ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();
  return (
    <div css={fixedButtonContainerStyle(theme)}>
      <div css={buttonContainerStyle}>
        {onDeleteClick && (
          <button css={deleteButtonStyle(theme)} ref={ref} onClick={onDeleteClick}>
            삭제하기
          </button>
        )}
        {onBackClick && (
          <button css={cancleButtonStyle(theme)} ref={ref} onClick={onBackClick}>
            이전으로
          </button>
        )}
        <button
          css={fixedButtonStyle({variants, theme})}
          ref={ref}
          disabled={variants === 'loading' ? true : disabled}
          {...htmlProps}
        >
          {variants === 'loading' ? (
            <Lottie animationData={loadingAnimation} loop={true} style={{height: '1.25rem'}} />
          ) : (
            children
          )}
        </button>
      </div>
    </div>
  );
});

export default FixedButton;
