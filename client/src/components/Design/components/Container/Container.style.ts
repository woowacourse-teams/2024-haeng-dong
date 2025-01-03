import {css} from '@emotion/react';
import {ContainerProps} from './Container.type';

export const containerStyle = ({maxW, p, m, br, b, bg, center}: ContainerProps) => {
  const maxWidthValue =
    typeof maxW === 'number'
      ? `${maxW}px`
      : maxW?.includes('px') || maxW?.includes('%') || maxW?.includes('em')
        ? maxW
        : `${maxW}px`;
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
