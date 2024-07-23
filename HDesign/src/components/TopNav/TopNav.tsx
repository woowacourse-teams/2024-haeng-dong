/** @jsxImportSource @emotion/react */
import {useNavigate} from 'react-router-dom';
import TextButton from '../TextButton/TextButton';
import {topNavNonStyle, topNavStyle} from './TopNav.style';
import {TopNavProps} from './TopNav.type';
import Switch from '../Switch/Switch';

// TODO: (@todari) navigation으로 인해 storybook 동작하지 않는 오류 해결해야함
// + 페이지 정하는 것에 따라, navigate 경로 수정해 줘야 함
const TopNav = ({navType, path}: TopNavProps) => {
  const navigate = useNavigate();

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
            <Switch values={['홈', '관리']} onChange={() => navigate(path ?? './')}></Switch>{' '}
          </div>
        );

      case 'none':
        return <div css={topNavNonStyle} />;

      default:
        return null;
    }
  };

  return <TopNavByType />;
};

export default TopNav;
