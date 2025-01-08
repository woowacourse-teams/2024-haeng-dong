import {css} from '@emotion/react';

import {attributeWithUnit} from '@components/Design/utils/attribute';

import {BoxProps} from './Box.type';

export const boxStyle = ({w, h, z, bg, p, m, br, b, center, fixed}: BoxProps) => {
  const [widthValue, heightValue, zIndexValue, paddingValue, marginValue, borderRadiusValue, borderValue] =
    attributeWithUnit({
      w,
      h,
      z,
      p,
      m,
      br,
      b,
    });

  return css`
    width: ${widthValue};
    height: ${heightValue};
    background: ${bg};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    z-index: ${zIndexValue};
    ${center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
    ${fixed &&
    css`
      position: fixed;
    `}
  `;
};
