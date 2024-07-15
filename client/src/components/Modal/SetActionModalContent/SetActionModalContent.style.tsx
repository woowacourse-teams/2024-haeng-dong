import {css} from '@emotion/react';

export const buttonStyle = (isActive: boolean) => css`
  font-weight: ${isActive ? 'bold' : 'normal'};
  color: ${isActive ? '#333' : '#ccc'};
  padding: 10px;
  cursor: pointer;
`;

export const dividerStyle = css`
  margin: 0 10px;
  color: #ccc;
`;

export const switchStyle = css`
  display: flex;
  align-items: center;
`;

export const switchContainerStyle = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
