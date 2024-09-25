/** @jsxImportSource @emotion/react */
import {useLocation, useNavigate} from 'react-router-dom';

import getDeletedLastPath from '@utils/getDeletedLastPath';

import TextButton from '../TextButton/TextButton';

import {navElementStyle} from './NavElememt.style';
import {NavElementProps} from './NavElement.type';

const NavElement = ({displayName, routePath, onHandleRouteInFunnel, noEmphasis = false, children}: NavElementProps) => {
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
    <li css={navElementStyle} onClick={handleNavigation}>
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

export default NavElement;
