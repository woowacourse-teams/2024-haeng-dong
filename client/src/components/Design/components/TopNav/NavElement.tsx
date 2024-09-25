import {useLocation, useNavigate} from 'react-router-dom';

import getDeletedLastPath from '@utils/getDeletedLastPath';

import TextButton from '../TextButton/TextButton';

import {navElementStyle} from './NavElememt.style';

type NavElementProps = React.PropsWithChildren & {
  displayName?: string;
  routePath: string;
  onHandleRouteInFunnel?: () => void;
};

const NavElement = ({displayName, routePath, onHandleRouteInFunnel, children}: NavElementProps) => {
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

  return (
    <li css={navElementStyle} onClick={handleNavigation}>
      {children ? (
        children
      ) : (
        <TextButton textColor={matchPath ? 'onTertiary' : 'gray'} textSize="bodyBold">
          {displayName}
        </TextButton>
      )}
    </li>
  );
};

export default NavElement;
