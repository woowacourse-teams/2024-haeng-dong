import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const PATH_TABLE: Record<string, string> = {
  홈: 'home',
  관리: 'admin',
};

const PATH_DISPLAY_TABLE: Record<string, string> = {
  home: '홈',
  admin: '관리',
};

const useNavSwitch = () => {
  const paths = ['홈', '관리'];
  const location = useLocation();
  const navigate = useNavigate();

  const pathArray = location.pathname.split('/');
  const basePath = pathArray.slice(0, -1).join('/');
  const lastPath = pathArray[pathArray.length - 1];

  const [nav, setNav] = useState(PATH_DISPLAY_TABLE[lastPath]);

  useEffect(() => {
    const isLogin = lastPath === 'login';
    setNav(isLogin ? '관리' : PATH_DISPLAY_TABLE[lastPath]);
  }, [location]);

  const onChange = (displayName: string) => {
    setNav(displayName);
    navigate(`${basePath}/${PATH_TABLE[displayName]}`);
  };

  return {
    nav,
    paths,
    onChange,
  };
};

export default useNavSwitch;
