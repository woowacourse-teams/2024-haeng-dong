/** @jsxImportSource @emotion/react */
import React from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {BillItemProps} from './BillItem.type';
import {billItemStyle, prefixStyle, textStyle} from './BillItem.style';
import Text from '@components/Text/Text';
import IconButton from '../IconButton/IconButton';

export const BillItem: React.FC<BillItemProps> = ({
  name = '',
  price = 0,
  hasDragHandle = false,
  ...htmlProps
}: BillItemProps) => {
  const {theme} = useTheme();
  return (
    <div css={billItemStyle(theme, hasDragHandle)} {...htmlProps}>
      <div css={prefixStyle}>
        {hasDragHandle && <IconButton iconType="buljusa" />}
        <Text css={textStyle(theme)} size="bodyBold">
          {name}
        </Text>
      </div>
      <Text css={textStyle(theme)} size="body">
        {price.toLocaleString('ko-kr')} 원
      </Text>
    </div>
  );
};
export default BillItem;
