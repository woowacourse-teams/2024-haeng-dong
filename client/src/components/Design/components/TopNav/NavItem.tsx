import {navItemStyle} from './NavItem.style';
import {NavItemProps} from './NavItem.type';

const NavItem = ({children}: NavItemProps) => {
  return <li css={navItemStyle}>{children}</li>;
};

export default NavItem;
