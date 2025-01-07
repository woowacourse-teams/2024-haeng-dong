import {css} from '@emotion/react';

import {ContainerProps} from './Container.type';
import {attributeWithUnit} from '@components/Design/utils/attribute';

export const containerStyle = ({maxW, p, m, br, b, bg, center}: ContainerProps) => {
  const [maxWidthValue, paddingValue, marginValue, borderRadiusValue, borderValue] = attributeWithUnit({
    maxW,
    p,
    m,
    br,
    b,
  });

  return css`
    width: 100%;
    ${center && 'display: flex; justify-content: center; align-items: center;'}
    max-width: ${maxWidthValue};
    background: ${bg};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
  `;
};
