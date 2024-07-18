/** @jsxImportSource @emotion/react */
import type {Size} from '@components/Text/Text.type';

import type {ComponentPropsWithoutRef} from 'react';

import React from 'react';

import {getSizeStyling} from './Text.style';

export interface TextProps extends ComponentPropsWithoutRef<'p'> {
  size?: Size | 'bodyBold' | 'smallBodyBold' | 'captionBold';
}

const Text: React.FC<TextProps> = ({size = 'body', children, ...attributes}: TextProps) => {
  return (
    <p css={getSizeStyling(size)} {...attributes}>
      {children}
    </p>
  );
};

export default Text;
