/** @jsxImportSource @emotion/react */

import NavElement from './NavElement';
import {topNavStyle} from './TopNav.style';

type TopNavProps = React.PropsWithChildren & {
  Element?: React.ReactNode;
};

const TopNav = ({children}: TopNavProps) => {
  return (
    <nav>
      <ul css={topNavStyle}>{children}</ul>
    </nav>
  );
};

TopNav.Element = NavElement;

export default TopNav;
