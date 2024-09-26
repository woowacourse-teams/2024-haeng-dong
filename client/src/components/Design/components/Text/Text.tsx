/** @jsxImportSource @emotion/react */
import type {TextProps} from '@HDcomponents/Text/Text.type';

import React from 'react';

import {useTheme} from '@theme/HDesignProvider';

import {getSizeStyling} from './Text.style';

const Text: React.FC<TextProps> = ({size = 'body', textColor = 'black', children, ...attributes}: TextProps) => {
  const {theme} = useTheme();
  return (
    <p css={getSizeStyling({size, textColor, theme})} {...attributes}>
      {children === '' ? '\u00A0' : children}
    </p>
  );
};

export default Text;
