/** @jsxImportSource @emotion/react */
import NavItem from './NavItem';
import {topNavStyle} from './TopNav.style';

type TopNavProps = React.PropsWithChildren & {
  Element?: React.ReactNode;
};

const TopNav = ({children}: TopNavProps) => {
  return (
    <nav style={{margin: '0 1rem'}}>
      <ul css={topNavStyle}>{children}</ul>
    </nav>
  );
};

TopNav.Item = NavItem;

export default TopNav;
