import {useNavigate} from 'react-router-dom';

import TextButton from '../TextButton/TextButton';
import Switch from '../Switch/Switch';

import {topNavStyle} from './TopNav.style';
import {TopNavProps} from './TopNav.type';

// TODO: (@todari) navigation으로 인해 storybook 동작하지 않는 오류 해결해야함
// + 페이지 정하는 것에 따라, navigate 경로 수정해 줘야 함
function TopNav({navType}: TopNavProps) {
  const navigate = useNavigate();
  return (
    <div css={topNavStyle}>
      {navType === 'back' ? (
        <TextButton onClick={() => navigate(-1)} textSize="bodyBold" textColor="gray">
          뒤로가기
        </TextButton>
      ) : (
        <Switch values={['홈', '관리']} onChange={() => navigate('./')} />
      )}
    </div>
  );
}

export default TopNav;
