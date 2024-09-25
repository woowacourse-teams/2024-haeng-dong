/** @jsxImportSource @emotion/react */

import {topNavStyle} from './TopNav.style';

const TopNav: React.FC<React.PropsWithChildren> = ({children}) => {
  return <nav css={topNavStyle}>{children}</nav>;
};

export default TopNav;
