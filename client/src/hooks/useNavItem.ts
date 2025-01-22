import {Location, useLocation, useNavigate} from 'react-router-dom';

import getEventBaseUrl from '@utils/getEventBaseUrl';

type Props = {
  onClick?: () => void;
  routePath?: string;
};

const getUrl = (routePath: string, location: Location): string => {
  if (routePath === '/') return '/';

  return `/${getEventBaseUrl(location.pathname)}${routePath}`;
};

const useNavItem = ({onClick, routePath = ''}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    const url = getUrl(routePath, location);

    if (routePath === '-1') {
      // navigate가 오버로드로 구현되어 있기 때문에 삼항 연산자 불가능.
      navigate(-1);
    } else {
      navigate(url);
    }
  };

  return {
    handleClick,
    isPathMatch: location.pathname.includes(routePath),
  };
};

export default useNavItem;
