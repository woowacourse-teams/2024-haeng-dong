import {css} from '@emotion/react';

import {BoxProps} from './Box.type';

export const boxStyle = ({w, h, z, bg, p, m, br, b, center, fixed}: BoxProps) => {
  const widthValue =
    typeof w === 'number' ? `${w}px` : w?.includes('px') || w?.includes('%') || w?.includes('em') ? w : `${w}px`;
  const heightValue =
    typeof h === 'number' ? `${h}px` : h?.includes('px') || h?.includes('%') || h?.includes('em') ? h : `${h}px`;
  const zIndexValue = typeof z === 'number' ? z : z;
  const paddingValue =
    typeof p === 'number'
      ? `${p}px`
      : p
          ?.split(' ')
          .map(value => (value.includes('px') || value.includes('%') || value.includes('em') ? value : `${value}px`))
          .join(' ');
  const marginValue =
    typeof m === 'number'
      ? `${m}px`
      : m
          ?.split(' ')
          .map(value => (value.includes('px') || value.includes('%') || value.includes('em') ? value : `${value}px`))
          .join(' ');
  const borderRadiusValue =
    typeof br === 'number' ? `${br}px` : br?.includes('px') || br?.includes('%') || br?.includes('em') ? br : `${br}px`;
  const borderValue = typeof b === 'number' ? `${b}px` : b;

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
