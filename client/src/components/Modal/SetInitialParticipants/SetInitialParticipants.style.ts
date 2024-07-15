import {css} from '@emotion/react';

export const inputStyle = css`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const buttonStyle = (isActive: boolean) => css`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: ${isActive ? '#B575FF' : '#e0e0e0'};
  border: none;
  border-radius: 10px;
  text-align: center;
  color: ${isActive ? 'white' : '#999'};
  margin-top: 10px;
`;

export const plusButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #f5f5ff;
  border: none;
  border-radius: 50%;
  color: #9e77ed;
  font-size: 24px;
  margin: 20px auto;
`;
