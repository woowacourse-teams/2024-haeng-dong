/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import Text from '@components/Text/Text';

import ErrorIcon from '@assets/error.svg';

import {useTheme} from '@theme/HDesignProvider';

import {toastStyle, textStyle} from './Toast.style';
import {ToastProps} from './Toast.type';
import useToast from './useToast';

const Toast: React.FC<ToastProps> = ({top = 80, message, showingTime, alwaysShow}) => {
  const {theme} = useTheme();
  const {isShow} = useToast({message, showingTime, alwaysShow});

  return createPortal(
    // TODO: (@cookie) toast를 위한 시멘틱 태그 알아보기
    <div css={toastStyle(top, isShow, theme)}>
      <ErrorIcon />
      <Text size="smallBodyBold" css={textStyle(theme)}>
        {message}
      </Text>
    </div>,
    document.body,
  );
};

export default Toast;
