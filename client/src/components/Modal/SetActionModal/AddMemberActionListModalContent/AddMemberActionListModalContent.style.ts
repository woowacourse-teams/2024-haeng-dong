import {css} from '@emotion/react';

const container = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    height: '100%',
  });

const inputGroup = () =>
  css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflow: 'auto',
    paddingBottom: '14rem',
  });

const addMemberActionListModalContentStyle = {
  container,
  inputGroup,
};

export default addMemberActionListModalContentStyle;
