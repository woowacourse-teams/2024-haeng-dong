import {css} from '@emotion/react';
import {createPortal} from 'react-dom';

import {useTheme} from '@components/Design/theme/HDesignProvider';

import FixedButton from '../FixedButton/FixedButton';

import NumberKeyboard, {NumberKeyboardProps} from './NumberKeyboard';

interface Props extends NumberKeyboardProps {
  isOpened?: boolean;
  onClose: () => void;
}

const NumberKeyboardBottomSheet = ({isOpened, onClose, ...props}: Props) => {
  const {theme} = useTheme();
  return createPortal(
    <div
      css={css`
        position: fixed;
        padding-bottom: 6.25rem;
        width: 100%;
        max-width: 768px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        bottom: 0;
        background-color: ${theme.colors.white};

        transform: ${isOpened ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)'};
        transition: 0.2s ease-in-out;
      `}
    >
      <NumberKeyboard {...props} />
      <FixedButton variants="tertiary" onClick={onClose}>
        닫기
      </FixedButton>
    </div>,
    document.body,
  );
};

export default NumberKeyboardBottomSheet;
