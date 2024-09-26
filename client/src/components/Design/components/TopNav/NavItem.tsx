/** @jsxImportSource @emotion/react */
import type {NavItemProps} from './NavItem.type';

import {useLocation, useNavigate} from 'react-router-dom';

import getDeletedLastPath from '@utils/getDeletedLastPath';

import TextButton from '../TextButton/TextButton';

import {navItemStyle} from './NavItem.style';

const NavItem = ({displayName, routePath, onHandleRouteInFunnel, noEmphasis = false, children}: NavItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const matchPath = location.pathname.includes(routePath);

  const handleNavigation = () => {
    if (onHandleRouteInFunnel) {
      onHandleRouteInFunnel();
      return;
    }

    switch (routePath) {
      case '/':
        navigate('/');
        break;
      case '-1':
        navigate(-1);
        break;
      default:
        navigate(`${getDeletedLastPath(location.pathname)}${routePath}`);
        break;
    }
  };

  const getTextColor = () => {
    if (noEmphasis) return 'gray';

    return matchPath ? 'onTertiary' : 'gray';
  };

  return (
    <li css={navItemStyle} onClick={handleNavigation}>
      {children ? (
        children
      ) : (
        <TextButton textColor={getTextColor()} textSize="bodyBold">
          {displayName}
        </TextButton>
      )}
    </li>
  );
};

export default NavItem;
