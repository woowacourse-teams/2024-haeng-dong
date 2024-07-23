/** @jsxImportSource @emotion/react */
import {useLocation, useNavigate} from 'react-router-dom';
import TextButton from '../TextButton/TextButton';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import {TopNavProps} from './TopNav.type';
import Switch from '../Switch/Switch';

// TODO: (@todari) navigation으로 인해 storybook 동작하지 않는 오류 해결해야함
// + 페이지 정하는 것에 따라, navigate 경로 수정해 줘야 함
const TopNav = ({navType}: TopNavProps) => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const PATH_TABLE: Record<string, string> = {
    홈: `${currentPath}/`,
    관리: `${currentPath}/admin`,
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
            <Switch value="홈" values={['홈', '관리']} onChange={value => navigate(PATH_TABLE[value])}></Switch>{' '}
          </div>
        );

      default:
        return <div css={topNavNonStyle} />;
    }
  };

  return <TopNavByType />;
};

export default TopNav;
