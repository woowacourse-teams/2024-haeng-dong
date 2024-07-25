import {useLocation, useNavigate} from 'react-router-dom';
import Switch from '../Switch/Switch';
import {topNavStyle} from './TopNav.style';
import {useState} from 'react';

export interface Path {
  display: string;
  path: string;
}

const PATH_TABLE: Record<string, Path> = {
  home: {display: '홈', path: 'home'},
  admin: {display: '관리', path: 'admin'},
};

const getPathByDisplay = (displayName: string): string | undefined => {
  for (const key in PATH_TABLE) {
    if (PATH_TABLE[key].display === displayName) {
      return PATH_TABLE[key].path;
    }
  }

  return undefined;
};
const TopHomeNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathArray = location.pathname.split('/');
  const basePath = pathArray.slice(0, -1).join('/');
  const lastPath = pathArray[pathArray.length - 1];
  const displayName = PATH_TABLE[lastPath].display;

  const [nav, setNav] = useState(displayName);

  const handleRoute = (nav: string) => {
    setNav(nav);
    navigate(`${basePath}/${getPathByDisplay(nav)}`);
  };

  return (
    <div css={topNavStyle}>
      <Switch value={nav} values={['홈', '관리']} onChange={handleRoute} />
    </div>
  );
};

export default TopHomeNav;
