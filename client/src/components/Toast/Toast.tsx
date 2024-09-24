import {createPortal} from 'react-dom';
import {useState, useEffect} from 'react';

import {Button, Flex, Icon, Text} from '@HDesign/index';

import {toastStyle, textStyle, toastMarginStyle} from './Toast.style';
import {ToastProps, ToastType} from './Toast.type';

const renderIcon = (type: ToastType) => {
  if (type === 'none') return null;

  return <Icon iconType={type} />;
};

const ANIMATION_TIME = 500;

const Toast = ({
  type = 'confirm',
  top = '0px',
  bottom = '6rem',
  isCloseOnClick = true,
  isAutoClosed = true,
  position = 'bottom',
  showingTime = 3000,
  message,
  onUndo,
  onClose,
  ...htmlProps
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const styleProps = {position, top, bottom};

  const handleClickToClose = () => {
    if (!isCloseOnClick || !onClose) return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, ANIMATION_TIME); // fadeOut 애니메이션 시간과 동일하게 설정
  };

  const handleAutoClose = () => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, ANIMATION_TIME); // fadeOut 애니메이션 시간과 동일하게 설정
    }, showingTime - ANIMATION_TIME); // 토스트가 내려가는 시간 확보

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    if (isAutoClosed) handleAutoClose();
  }, []);

  return createPortal(
    <div css={toastMarginStyle({...styleProps})} {...htmlProps} onClick={handleClickToClose} id="toast">
      <div css={toastStyle(isVisible)}>
        <Flex justifyContent="spaceBetween" alignItems="center">
          <Flex alignItems="center" gap="0.5rem">
            {renderIcon(type)}
            <Text size="smallBodyBold" css={textStyle}>
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
