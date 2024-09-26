/** @jsxImportSource @emotion/react */
import {forwardRef} from 'react';

import {
  fixedButtonContainerStyle,
  fixedButtonStyle,
  buttonContainerStyle,
  cancleButtonStyle,
  deleteButtonStyle,
} from '@HDcomponents/FixedButton/FixedButton.style';
import {FixedButtonProps} from '@HDcomponents/FixedButton/FixedButton.type';
import {useTheme} from '@theme/HDesignProvider';

import Lottie from '../Lottie/Lottie';

export const FixedButton: React.FC<FixedButtonProps> = forwardRef<HTMLButtonElement, FixedButtonProps>(function Button(
  {variants = 'primary', onDeleteClick, onBackClick, disabled, children, ...htmlProps}: FixedButtonProps,
  ref,
) {
  const {theme} = useTheme();

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // 이미지가 왜곡되지 않게 비율을 유지하며 버튼 크기에 맞춤
  };

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
          {variants === 'loading' ? <Lottie /> : children}
        </button>
      </div>
    </div>
  );
});

export default FixedButton;
