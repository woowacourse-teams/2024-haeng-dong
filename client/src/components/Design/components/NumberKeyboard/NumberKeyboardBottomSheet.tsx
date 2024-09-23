import {css} from '@emotion/react';
import NumberKeyboard, {NumberKeyboardProps} from './NumberKeyboard';
import {useTheme} from '@components/Design/theme/HDesignProvider';
import {createPortal} from 'react-dom';
import FixedButton from '../FixedButton/FixedButton';

interface Props extends NumberKeyboardProps {
  isOpened?: boolean;
  onClose: () => void;
}

const NumberKeyboardBottomSheet = ({isOpened, onClose, ...props}: Props) => {
  const {theme} = useTheme();
  return createPortal(
    <div
      css={css`
        position: absolute;
        padding-bottom: 6.25rem;
        width: 100%;
        max-width: 768px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        bottom: 0;
        background-color: ${theme.colors.white};

        transform: ${isOpened ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100vh, 0)'};
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
