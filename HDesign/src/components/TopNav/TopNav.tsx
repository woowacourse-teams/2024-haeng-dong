/** @jsxImportSource @emotion/react */
import {useLocation, useNavigate} from 'react-router-dom';
import TextButton from '../TextButton/TextButton';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import {TopNavProps} from './TopNav.type';
import Switch from '../Switch/Switch';
import {useState} from 'react';

// TODO: (@todari) navigation으로 인해 storybook 동작하지 않는 오류 해결해야함
// + 페이지 정하는 것에 따라, navigate 경로 수정해 줘야 함
const TopNav = ({navType}: TopNavProps) => {
  const [nav, setNav] = useState('홈');
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = location.pathname.split('/').slice(0, -1).join('/');

  const PATH_TABLE: Record<string, string> = {
    홈: `${basePath}/home`,
    관리: `${basePath}/admin`,
  };

  const handleRoute = (nav: string) => {
    setNav(nav);
    navigate(PATH_TABLE[nav]);
  };

  const TopNavByType = () => {
    switch (navType) {
      case 'back':
        return (
          <div css={topNavStyle}>
            <TextButton onClick={() => navigate(-1)} textSize="bodyBold" textColor="gray">
              뒤로가기
            </TextButton>
          </div>
        );

      case 'home':
        return (
          <div css={topNavStyle}>
            <Switch value={nav} values={['홈', '관리']} onChange={handleRoute}></Switch>
          </div>
        );

      default:
        return <div css={topNavNonStyle} />;
    }
  };

  return <TopNavByType />;
};

export default TopNav;
