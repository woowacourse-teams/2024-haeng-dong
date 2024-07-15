/** @jsxImportSource @emotion/react */
import React from 'react';
import type {Size} from './Text.type';
import type {ComponentPropsWithoutRef} from 'react';

import {getSizeStyling} from './Text.style';

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
  size?: Size | 'bodyBold' | 'smallBodyBold' | 'captionBold';
}

const Text: React.FC = ({size = 'body', children, ...attributes}: TextProps) => {
  return (
    <p css={getSizeStyling(size)} {...attributes}>
      {children}
    </p>
  );
};

export default Text;
