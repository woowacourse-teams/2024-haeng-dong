/** @jsxImportSource @emotion/react */

import React, {forwardRef} from 'react';

import {useTheme} from '@theme/HDesignProvider';
import {BillItemProps} from './BillItem.type';

export const BillItem: React.FC<BillItemProps> = ({name = '', price = 0, ...htmlProps}: BillItemProps) => {
  const {theme} = useTheme();
  return <div {...htmlProps} />;
};
export default BillItem;
