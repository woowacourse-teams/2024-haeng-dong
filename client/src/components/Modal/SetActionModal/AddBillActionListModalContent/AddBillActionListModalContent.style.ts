import {css} from '@emotion/react';

const container = () =>
  css({
    height: '100%',
  });

const inputContainer = () =>
  css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: '1.5rem',
    overflow: 'auto',
    paddingBottom: '14rem',
  });

export const input = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  });

const addBillActionListStyle = {
  container,
  inputContainer,
  input,
};

export default addBillActionListStyle;
