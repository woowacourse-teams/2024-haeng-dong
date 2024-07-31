/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import Text from '@components/Text/Text';
import ErrorIcon from '@assets/error.svg';
import ConfirmIcon from '@assets/confirm.svg';

import {useTheme} from '@theme/HDesignProvider';
import {toastStyle, textStyle, toastMarginStyle} from './Toast.style';
import {ToastProps, ToastType} from './Toast.type';
import Flex from '@components/Flex/Flex';
import Button from '../Button/Button';

const renderIcon = (type: ToastType) => {
  switch (type) {
    case 'error':
      return <ErrorIcon />;

    case 'confirm':
      return <ConfirmIcon />;

    case 'none':
      return null;

    default:
      return null;
  }
};

const Toast = ({
  type = 'confirm',
  top = '0px',
  bottom = '0px',
  isClickToClose = true,
  position,
  message,
  onUndo,
  onClose,
  ...htmlProps
}: ToastProps) => {
  const {theme} = useTheme();
  const styleProps = {position, top, bottom};

  const handleClickToClose = () => {
    if (!isClickToClose || !onClose) return;

    onClose();
  };

  return createPortal(
    <div css={toastMarginStyle({...styleProps})} {...htmlProps} onClick={handleClickToClose}>
      <div css={toastStyle(theme)}>
        <Flex justifyContent="spaceBetween" alignItems="center">
          <Flex alignItems="center" gap="0.5rem">
            {renderIcon(type)}
            <Text size="smallBodyBold" css={textStyle(theme)}>
              {message}
            </Text>
          </Flex>
          {onUndo && (
            <Button variants="tertiary" size="small" onClick={onUndo}>
              되돌리기
            </Button>
          )}
        </Flex>
      </div>
    </div>,
    document.body,
  );
};

export default Toast;
