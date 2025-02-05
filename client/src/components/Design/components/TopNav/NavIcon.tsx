import {ReactElement} from 'react';

import useNavItem from '@hooks/useNavItem';

import IconButton from '../IconButton/IconButton';
import Svg from '../Icons/Svg';
import {IconButtonProps} from '../IconButton/IconButton.type';

import {NavItemProps} from './NavItem.type';
import NavItem from './NavItem';

type NavIconProps = Omit<NavItemProps, 'children'> &
  Partial<IconButtonProps> & {
    component: ReactElement<typeof Svg>;

    onClick?: () => void;
  };

/**
 * onClick를 넘겨주었으면 routePath는 무시됩니다.
 */
const NavIcon = ({component, routePath, onClick, ...iconButtonProps}: NavIconProps) => {
  const {handleClick} = useNavItem({onClick, routePath});

  return (
    <NavItem>
      <IconButton onClick={handleClick} {...iconButtonProps} variants="none">
        {component}
      </IconButton>
    </NavItem>
  );
};

export default NavIcon;
