import {css} from '@emotion/react';
import {useTheme} from 'haengdong-design/dist/theme/HDesignProvider';

interface NavStyleProps {}

export const navStyle = css({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',

  top: '0',
  width: '100%',
  zIndex: '20',
  height: '4rem',
  boxShadow: '0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.12)',
  backgroundColor: 'white',
});

export const logoStyle = css({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});
