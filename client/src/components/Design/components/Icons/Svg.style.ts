import {css} from '@emotion/react';

export const svgWrapperStyle = (width?: number, height?: number, size?: number) => {
  const w = width ?? size ?? 24;
  const h = height ?? size ?? 24;

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${w}px;
    height: ${h}px;
  `;
};

export const svgStyle = css`
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
  }
`;
