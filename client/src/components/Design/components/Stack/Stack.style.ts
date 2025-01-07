import {css} from '@emotion/react';

import {HStackProps, StackProps, VStackProps} from './Stack.type';
import {attributeWithUnit} from '@components/Design/utils/attribute';

export const stackStyle = ({gap, direction, justify, align, p, m, br, b, bg, w, h}: StackProps) => {
  const [widthValue, heightValue, paddingValue, marginValue, borderRadiusValue, borderValue, gapValue] =
    attributeWithUnit({
      w,
      h,
      p,
      m,
      br,
      b,
      gap,
    });

  return css`
    display: flex;
    width: ${widthValue};
    height: ${heightValue};
    gap: ${gapValue};
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    background: ${bg};
  `;
};

export const hStackStyle = ({gap, justify, p, m, br, b, bg}: HStackProps) => {
  const [paddingValue, marginValue, borderRadiusValue, borderValue, gapValue] = attributeWithUnit({
    p,
    m,
    br,
    b,
    gap,
  });

  return css`
    flex-direction: row;
    display: flex;
    gap: ${gapValue};
    justify-content: ${justify};
    align-items: center;
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    background: ${bg};
  `;
};

export const vStackStyle = ({gap, align, p, m, br, b, bg}: VStackProps) => {
  const [paddingValue, marginValue, borderRadiusValue, borderValue, gapValue] = attributeWithUnit({
    p,
    m,
    br,
    b,
    gap,
  });

  return css`
    flex-direction: column;
    display: flex;
    gap: ${gapValue};
    justify-content: center;
    align-items: ${align};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    background: ${bg};
  `;
};
