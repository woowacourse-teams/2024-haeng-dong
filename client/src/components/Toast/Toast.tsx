import {createPortal} from 'react-dom';
import {useState, useEffect} from 'react';
import {Button, Flex, Icon, Text} from 'haengdong-design';

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
  bottom = '0px',
  isClickToClose = true,
  position = 'bottom',
  showingTime,
  message,
  onUndo,
  onClose,
  ...htmlProps
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const styleProps = {position, top, bottom};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, ANIMATION_TIME); // fadeOut 애니메이션 시간과 동일하게 설정
    }, showingTime - ANIMATION_TIME); // 토스트가 내려가는 시간 확보

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleClickToClose = () => {
    if (!isClickToClose || !onClose) return;

    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, ANIMATION_TIME); // fadeOut 애니메이션 시간과 동일하게 설정
  };

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
