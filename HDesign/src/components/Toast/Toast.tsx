/** @jsxImportSource @emotion/react */
import {createPortal} from 'react-dom';

import Text from '@components/Text/Text';

import ErrorIcon from '@assets/error.svg';
import ConfirmIcon from '@assets/confirm.svg';

import {useTheme} from '@theme/HDesignProvider';

import {toastStyle, textStyle, toastMarginStyle} from './Toast.style';
import {ToastProps} from './Toast.type';
import useToast from './useToast';
import Flex from '@components/Flex/Flex';

const Toast = ({position, top, bottom, message, showingTime, alwaysShow, ...htmlProps}: ToastProps) => {
  const {theme} = useTheme();
  const {isShow} = useToast({message, showingTime, alwaysShow});
  const styleProps = {position, top, bottom};

  // TODO: (@cookie) toast를 위한 시멘틱 태그 알아보기
  return createPortal(
    <div css={toastMarginStyle({...styleProps, isShow})} {...htmlProps}>
      <div css={toastStyle(theme)}>
        <Flex alignItems="center" gap="0.5rem">
          <ConfirmIcon />
          {/* <ErrorIcon /> */}
          <Text size="smallBodyBold" css={textStyle(theme)}>
            {message}
          </Text>
        </Flex>
      </div>
    </div>,
    document.body,
  );
};

export default Toast;
