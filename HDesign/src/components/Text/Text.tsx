/** @jsxImportSource @emotion/react */
import type {TextProps} from '@components/Text/Text.type';

import React from 'react';

import {getSizeStyling} from './Text.style';

const Text: React.FC<TextProps> = ({size = 'body', children, ...attributes}: TextProps) => {
  return (
    <p css={getSizeStyling(size)} {...attributes}>
      {children}
    </p>
  );
};

export default Text;
