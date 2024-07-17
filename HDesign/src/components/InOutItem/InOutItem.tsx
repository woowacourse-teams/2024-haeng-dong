/** @jsxImportSource @emotion/react */
import React from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {InOutItemProps} from './InOutItem.type';
import {inOutItemStyle, prefixStyle, textStyle} from './InOutItem.style';
import Text from '@components/Text/Text';
import IconButton from '../IconButton/IconButton';

export const InOutItem: React.FC<InOutItemProps> = ({names = [], inOutType = 'out', ...htmlProps}: InOutItemProps) => {
  const {theme} = useTheme();

  // TODO: (@toari) : 사람 수 많을 때 UX writing 처리
  return (
    <div css={inOutItemStyle(theme)} {...htmlProps}>
      <div css={prefixStyle}>
        <IconButton iconType="buljusa" />
        <Text css={textStyle(theme)} size="captionBold">
          {names.join(', ')} {inOutType === 'out' ? '나감' : '들어옴'}
        </Text>
      </div>
    </div>
  );
};
export default InOutItem;
