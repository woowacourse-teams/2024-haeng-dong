import {css} from '@emotion/react';
import {HStackProps, StackProps, VStackProps} from './Stack.type';

export const stackStyle = ({gap, direction, justify, align, p, m, br, b, bg}: StackProps) => {
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
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap?.includes('px') || gap?.includes('em') ? gap : `${gap}px`;

  return css`
    display: flex;
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

export const hStackStyle = ({gap, justify, align, p, m, br, b, bg}: HStackProps) => {
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
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap?.includes('px') || gap?.includes('em') ? gap : `${gap}px`;

  return css`
    flex-direction: row;
    display: flex;
    gap: ${gapValue};
    justify-content: ${justify};
    align-items: ${align};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    background: ${bg};
  `;
};

export const vStackStyle = ({gap, justify, align, p, m, br, b, bg}: VStackProps) => {
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
  const gapValue = typeof gap === 'number' ? `${gap}px` : gap?.includes('px') || gap?.includes('em') ? gap : `${gap}px`;

  return css`
    flex-direction: column;
    display: flex;
    gap: ${gapValue};
    justify-content: ${justify};
    align-items: ${align};
    padding: ${paddingValue};
    margin: ${marginValue};
    border-radius: ${borderRadiusValue};
    border: ${borderValue};
    background: ${bg};
  `;
};
