import {css} from '@emotion/react';

import {FlexProps} from '../Flex/Flex.type';

export const dropdownStyle: FlexProps = {
  flexDirection: 'column',
  width: '12.5rem',
  padding: '0.5rem 1rem',
  gap: '0.25rem',
  backgroundColor: 'white',

  otherStyle: {
    position: 'absolute',
    top: '2rem',
    right: '-1rem',
    borderRadius: '0.75rem',
    boxShadow: '2px 4px 16px 0 rgba(0, 0, 0, 0.08)',
  },
};

export const dropdownButtonStyle = css({
  width: '100%',
  height: '2rem',
  padding: '0.25rem 1rem',
});
